import { NextRequest, NextResponse } from 'next/server'
import { generateGoogleAds, GoogleAdsGenerationRequest } from '../../../../lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields: (keyof GoogleAdsGenerationRequest)[] = [
      'businessName',
      'businessDescription', 
      'targetAudience',
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
    
    // Generate Google Ads
    const result = await generateGoogleAds(body as GoogleAdsGenerationRequest)
    
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Google Ads generation error:', error)
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
} 