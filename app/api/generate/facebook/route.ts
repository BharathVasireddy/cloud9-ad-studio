import { NextRequest, NextResponse } from 'next/server'
import { generateFacebookAds, FacebookAdsGenerationRequest } from '../../../../lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields: (keyof FacebookAdsGenerationRequest)[] = [
      'businessName',
      'businessDescription', 
      'targetAudience',
      'objective',
      'keyFeatures',
      'callToAction'
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }
    
    if (!Array.isArray(body.keyFeatures) || body.keyFeatures.length === 0) {
      return NextResponse.json(
        { error: 'keyFeatures must be a non-empty array' },
        { status: 400 }
      )
    }
    
    // Validate objective
    const validObjectives = ['awareness', 'traffic', 'engagement', 'leads', 'sales']
    if (!validObjectives.includes(body.objective)) {
      return NextResponse.json(
        { error: 'Invalid objective. Must be one of: ' + validObjectives.join(', ') },
        { status: 400 }
      )
    }
    
    // Generate Facebook Ads
    const result = await generateFacebookAds(body as FacebookAdsGenerationRequest)
    
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Facebook Ads generation error:', error)
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 