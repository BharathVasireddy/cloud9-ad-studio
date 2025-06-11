import { NextRequest, NextResponse } from 'next/server'
import { generateGoogleAds, GoogleAdsGenerationRequest } from '../../../../lib/openai'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'

interface RequestBody {
  clientId: string
  serviceId: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as RequestBody
    
    // Validate required fields
    if (!body.clientId || !body.serviceId) {
      return NextResponse.json(
        { error: 'Missing required fields: clientId and serviceId' },
        { status: 400 }
      )
    }

    // Fetch client data from Firestore
    const clientDoc = await getDoc(doc(db, 'clients', body.clientId))
    if (!clientDoc.exists()) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      )
    }

    const clientData = clientDoc.data()
    const selectedService = clientData.services?.find((s: any) => s.id === body.serviceId)
    
    if (!selectedService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    // Build OpenAI request with client data
    const generationRequest: GoogleAdsGenerationRequest = {
      businessName: clientData.businessName,
      businessDescription: clientData.description || `${clientData.businessName} offers ${selectedService.name}`,
      targetAudience: generateTargetAudience(clientData, selectedService),
      keyFeatures: [selectedService.name, ...generateKeyFeatures(clientData)],
      callToAction: generateCallToAction(selectedService),
      keywords: generateKeywords(clientData, selectedService),
      tone: 'professional',
      industry: clientData.industry,
      clientData: {
        city: clientData.city,
        website: clientData.website,
        services: clientData.services
      }
    }

    // Generate Google Ads
    const result = await generateGoogleAds(generationRequest)
    
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Google Ads generation error:', error)
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper functions to automatically generate content from client data
function generateTargetAudience(clientData: any, service: any): string {
  const baseAudience = `Businesses looking for ${service.name.toLowerCase()}`
  
  if (clientData.industry) {
    return `${clientData.industry} ${baseAudience}`
  }
  
  if (clientData.city) {
    return `${baseAudience} in ${clientData.city}`
  }
  
  return baseAudience
}

function generateKeyFeatures(clientData: any): string[] {
  const features = []
  
  if (clientData.services?.length > 0) {
    // Add top services as features
    features.push(...clientData.services.slice(0, 3).map((s: any) => s.name))
  }
  
  if (clientData.industry) {
    features.push(`${clientData.industry} expertise`)
  }
  
  if (clientData.city) {
    features.push(`Local ${clientData.city} service`)
  }
  
  // Add some generic business benefits
  features.push('Professional service', 'Reliable results')
  
  return features.slice(0, 5) // Limit to 5 features
}

function generateCallToAction(service: any): string {
  const ctas = [
    'Get Started Today',
    'Learn More',
    'Contact Us',
    'Get Quote',
    'Book Consultation'
  ]
  
  // Service-specific CTAs
  if (service.category === 'consulting') return 'Book Consultation'
  if (service.category === 'service') return 'Get Quote'
  if (service.category === 'product') return 'Shop Now'
  
  return ctas[0] // Default
}

function generateKeywords(clientData: any, service: any): string[] {
  const keywords = [service.name.toLowerCase()]
  
  if (clientData.industry) {
    keywords.push(clientData.industry.toLowerCase())
  }
  
  if (clientData.city) {
    keywords.push(clientData.city.toLowerCase())
  }
  
  // Add service category keywords
  keywords.push(service.category)
  
  return keywords
} 