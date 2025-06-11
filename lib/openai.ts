import OpenAI from 'openai'
import { PLATFORM_LIMITS } from '../types/generation'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

/**
 * Check if OpenAI is properly configured
 */
export const isOpenAIConfigured = (): boolean => {
  return !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 0)
}

/**
 * Generate Google Ads headlines and descriptions
 */
export interface GoogleAdsGenerationRequest {
  businessName: string
  businessDescription: string
  targetAudience: string
  keyFeatures: string[]
  callToAction: string
  keywords?: string[]
  tone?: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'playful'
  industry?: string
}

export interface GoogleAdsGenerationResponse {
  headlines: string[]
  descriptions: string[]
  confidence: number
  warnings: string[]
}

/**
 * Generate Google Ads copy using OpenAI
 */
export async function generateGoogleAds(
  request: GoogleAdsGenerationRequest
): Promise<GoogleAdsGenerationResponse> {
  if (!isOpenAIConfigured()) {
    throw new Error('OpenAI API key is not configured')
  }

  const { headline: headlineLimit, description: descLimit } = PLATFORM_LIMITS.google
  const tone = request.tone || 'professional'
  
  const systemPrompt = `You are an expert Google Ads copywriter specialized in creating high-converting ad copy that complies with Google Ads policies.

CRITICAL RULES:
1. Headlines: Maximum ${headlineLimit.maxLength} characters each (including spaces)
2. Descriptions: Maximum ${descLimit.maxLength} characters each (including spaces)
3. NO exclamation marks (!) allowed anywhere
4. NO ALL CAPS words
5. NO misleading claims or superlatives without proof
6. Must be relevant to the business and target audience
7. Focus on benefits, not just features
8. Include clear value propositions

TONE: ${tone}
RESPOND IN VALID JSON FORMAT ONLY.`

  const userPrompt = `Generate Google Ads copy for:

Business: ${request.businessName}
Description: ${request.businessDescription}
Target Audience: ${request.targetAudience}
Key Features: ${request.keyFeatures.join(', ')}
Call to Action: ${request.callToAction}
${request.keywords ? `Keywords to include: ${request.keywords.join(', ')}` : ''}
${request.industry ? `Industry: ${request.industry}` : ''}

Generate ${headlineLimit.maxCount} headlines (max ${headlineLimit.maxLength} chars each) and ${descLimit.maxCount} descriptions (max ${descLimit.maxLength} chars each).

Return JSON format:
{
  "headlines": ["headline1", "headline2", ...],
  "descriptions": ["desc1", "desc2", ...],
  "confidence": 0.85,
  "warnings": ["any warnings about compliance or improvements"]
}`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const response = JSON.parse(content) as GoogleAdsGenerationResponse
    
    // Validate response format
    if (!response.headlines || !response.descriptions) {
      throw new Error('Invalid response format from OpenAI')
    }

    // Validate character limits
    const validatedResponse = validateGoogleAdsResponse(response)
    
    return validatedResponse
  } catch (error: any) {
    console.error('OpenAI generation error:', error)
    
    if (error.name === 'SyntaxError') {
      throw new Error('Failed to parse AI response. Please try again.')
    }
    
    throw new Error(`Ad generation failed: ${error.message}`)
  }
}

/**
 * Validate Google Ads response for compliance
 */
function validateGoogleAdsResponse(response: GoogleAdsGenerationResponse): GoogleAdsGenerationResponse {
  const { headline: headlineLimit, description: descLimit } = PLATFORM_LIMITS.google
  const warnings: string[] = [...(response.warnings || [])]
  
  // Validate headlines
  const validHeadlines = response.headlines.filter(headline => {
    const length = headline.length
    const hasExclamation = headline.includes('!')
    const hasAllCaps = headline !== headline.toLowerCase() && headline === headline.toUpperCase()
    
    if (length > headlineLimit.maxLength) {
      warnings.push(`Headline too long: "${headline}" (${length} chars)`)
      return false
    }
    
    if (hasExclamation) {
      warnings.push(`Headline contains exclamation mark: "${headline}"`)
      return false
    }
    
    if (hasAllCaps) {
      warnings.push(`Headline contains all caps: "${headline}"`)
      return false
    }
    
    return true
  })
  
  // Validate descriptions
  const validDescriptions = response.descriptions.filter(description => {
    const length = description.length
    const hasExclamation = description.includes('!')
    
    if (length > descLimit.maxLength) {
      warnings.push(`Description too long: "${description}" (${length} chars)`)
      return false
    }
    
    if (hasExclamation) {
      warnings.push(`Description contains exclamation mark: "${description}"`)
      return false
    }
    
    return true
  })
  
  return {
    headlines: validHeadlines.slice(0, headlineLimit.maxCount),
    descriptions: validDescriptions.slice(0, descLimit.maxCount),
    confidence: response.confidence || 0.8,
    warnings
  }
}

/**
 * Facebook Ads generation (different requirements)
 */
export interface FacebookAdsGenerationRequest {
  businessName: string
  businessDescription: string
  targetAudience: string
  objective: 'awareness' | 'traffic' | 'engagement' | 'leads' | 'sales'
  keyFeatures: string[]
  callToAction: string
  tone?: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'playful'
}

export interface FacebookAdsGenerationResponse {
  headlines: string[]
  descriptions: string[]
  confidence: number
  warnings: string[]
}

/**
 * Generate Facebook Ads copy
 */
export async function generateFacebookAds(
  request: FacebookAdsGenerationRequest
): Promise<FacebookAdsGenerationResponse> {
  if (!isOpenAIConfigured()) {
    throw new Error('OpenAI API key is not configured')
  }

  const { headline: headlineLimit, description: descLimit } = PLATFORM_LIMITS.facebook
  const tone = request.tone || 'professional'
  
  const systemPrompt = `You are an expert Facebook Ads copywriter specialized in creating engaging, scroll-stopping ad copy.

FACEBOOK ADS RULES:
1. Headlines: Maximum ${headlineLimit.maxLength} characters each
2. Descriptions: Maximum ${descLimit.maxLength} characters each  
3. More conversational than Google Ads
4. Can use emojis sparingly
5. Focus on emotional connection
6. Use social proof when possible
7. Address pain points directly

TONE: ${tone}
OBJECTIVE: ${request.objective}
RESPOND IN VALID JSON FORMAT ONLY.`

  const userPrompt = `Generate Facebook Ads copy for:

Business: ${request.businessName}
Description: ${request.businessDescription}
Target Audience: ${request.targetAudience}
Campaign Objective: ${request.objective}
Key Features: ${request.keyFeatures.join(', ')}
Call to Action: ${request.callToAction}

Generate ${headlineLimit.maxCount} headlines (max ${headlineLimit.maxLength} chars each) and ${descLimit.maxCount} descriptions (max ${descLimit.maxLength} chars each).

Return JSON format:
{
  "headlines": ["headline1", "headline2", ...],
  "descriptions": ["desc1", "desc2", ...],
  "confidence": 0.85,
  "warnings": ["any warnings or suggestions"]
}`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8, // Slightly higher creativity for Facebook
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const response = JSON.parse(content) as FacebookAdsGenerationResponse
    
    // Validate response format
    if (!response.headlines || !response.descriptions) {
      throw new Error('Invalid response format from OpenAI')
    }

    return response
  } catch (error: any) {
    console.error('Facebook Ads generation error:', error)
    
    if (error.name === 'SyntaxError') {
      throw new Error('Failed to parse AI response. Please try again.')
    }
    
    throw new Error(`Facebook ad generation failed: ${error.message}`)
  }
}

/**
 * Test OpenAI connection
 */
export async function testOpenAIConnection(): Promise<boolean> {
  if (!isOpenAIConfigured()) {
    return false
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: 'Say "test" in JSON format' }],
      max_tokens: 50,
      response_format: { type: 'json_object' }
    })

    return !!completion.choices[0]?.message?.content
  } catch (error) {
    console.error('OpenAI connection test failed:', error)
    return false
  }
} 