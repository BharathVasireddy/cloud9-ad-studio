import { NextRequest, NextResponse } from 'next/server'
import { generateFacebookAds, FacebookAdsGenerationRequest } from '../../../../lib/openai'
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
    const generationRequest: FacebookAdsGenerationRequest = {
      businessName: clientData.businessName,
      businessDescription: clientData.description || `${clientData.businessName} offers ${selectedService.name}`,
      targetAudience: generateTargetAudience(clientData, selectedService),
      keyFeatures: [selectedService.name, ...generateKeyFeatures(clientData)],
      callToAction: generateCallToAction(selectedService),
      objective: generateObjective(selectedService),
      tone: 'engaging',
      industry: clientData.industry,
      clientData: {
        city: clientData.city,
        website: clientData.website,
        services: clientData.services
      }
    }

    // Generate Facebook Ads
    const result = await generateFacebookAds(generationRequest)
    
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Facebook Ads generation error:', error)
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper functions to automatically generate content from client data
function generateTargetAudience(clientData: any, service: any): string {
  const baseAudience = `People interested in ${service.name.toLowerCase()}`
  
  if (clientData.industry) {
    return `${baseAudience} and ${clientData.industry.toLowerCase()}`
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
  features.push('Professional service', 'Trusted by clients')
  
  return features.slice(0, 5) // Limit to 5 features
}

function generateCallToAction(service: any): string {
  const ctas = [
    'Learn More',
    'Get Started',
    'Contact Us',
    'Get Quote',
    'Book Now'
  ]
  
  // Service-specific CTAs
  if (service.category === 'consulting') return 'Book Now'
  if (service.category === 'service') return 'Get Quote'
  if (service.category === 'product') return 'Shop Now'
  
  return ctas[0] // Default
}

function generateObjective(service: any): 'awareness' | 'traffic' | 'engagement' | 'leads' | 'sales' | 'conversions' {
  // Service-specific objectives
  if (service.category === 'consulting') return 'leads'
  if (service.category === 'service') return 'conversions'
  if (service.category === 'product') return 'traffic'
  
  return 'conversions' // Default
} 