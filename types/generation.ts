/**
 * Ad generation types for Cloud 9 Ad Studio
 */

export interface Campaign {
  id: string
  userId: string
  clientId: string
  name: string
  platform: 'google' | 'facebook' | 'both'
  objective: string
  targetAudience: string
  headlines: HeadlineVariation[]
  descriptions: DescriptionVariation[]
  status: 'draft' | 'active' | 'paused' | 'completed'
  createdAt: Date
  updatedAt: Date
  generatedBy: 'ai' | 'manual'
  promptUsed?: string
}

/**
 * Google Ads headline (max 30 characters)
 */
export interface HeadlineVariation {
  id: string
  text: string
  characterCount: number
  isCompliant: boolean
  performance?: PerformanceMetrics
}

/**
 * Google Ads description (max 90 characters)
 */
export interface DescriptionVariation {
  id: string
  text: string
  characterCount: number
  isCompliant: boolean
  performance?: PerformanceMetrics
}

/**
 * Performance metrics for tracking ad effectiveness
 */
export interface PerformanceMetrics {
  clicks: number
  impressions: number
  ctr: number // Click-through rate
  conversions: number
  cost: number
  lastUpdated: Date
}

/**
 * AI generation request parameters
 */
export interface GenerationRequest {
  clientId: string
  serviceIds: string[]
  platform: 'google' | 'facebook'
  adType: 'search' | 'display' | 'video' | 'shopping'
  
  campaignGoal: 'awareness' | 'traffic' | 'leads' | 'sales' | 'engagement'
  targetAudience?: string
  budget?: {
    amount: number
    currency: string
    period: 'daily' | 'weekly' | 'monthly'
  }
  
  specialOffers?: string
  seasonalContext?: string
  customPrompt?: string
}

/**
 * AI generation response
 */
export interface GenerationResponse {
  headlines: string[]
  descriptions: string[]
  confidence: number
  suggestions?: string[]
  warnings?: string[]
}

/**
 * Campaign creation data
 */
export interface CreateCampaignData {
  userId: string
  clientId: string
  name: string
  platform: 'google' | 'facebook' | 'both'
  objective: string
  targetAudience: string
  generatedBy: 'ai' | 'manual'
  promptUsed?: string
}

/**
 * Google Ads compliance validation
 */
export interface ComplianceCheck {
  isCompliant: boolean
  violations: ComplianceViolation[]
  warnings: string[]
}

/**
 * Compliance violation details
 */
export interface ComplianceViolation {
  type: 'character_limit' | 'forbidden_character' | 'policy_violation'
  field: 'headline' | 'description'
  message: string
  suggestion?: string
}

/**
 * Platform-specific limits
 */
export const PLATFORM_LIMITS = {
  google: {
    headline: {
      maxLength: 30,
      maxCount: 15,
    },
    description: {
      maxLength: 90,
      maxCount: 4,
    },
  },
  facebook: {
    headline: {
      maxLength: 255,
      maxCount: 5,
    },
    description: {
      maxLength: 2200,
      maxCount: 5,
    },
  },
} as const

/**
 * Generation constraints interface
 */
export interface GenerationConstraints {
  maxHeadlines: number
  maxDescriptions: number
  tone: string
  includeKeywords: string[]
  avoidWords: string[]
  emphasizeFeatures: string[]
}

/**
 * Default generation constraints
 */
export const DEFAULT_GENERATION_CONSTRAINTS: GenerationConstraints = {
  maxHeadlines: 15,
  maxDescriptions: 4,
  tone: 'professional',
  includeKeywords: [],
  avoidWords: ['!'], // No exclamation marks for Google Ads
  emphasizeFeatures: [],
}

/**
 * Enhanced generation result interface
 */
export interface GenerationResult {
  id: string
  userId: string
  clientId: string
  serviceIds: string[]
  
  platform: 'google' | 'facebook'
  adType: string
  campaignGoal: string
  
  headlines?: string[]
  descriptions?: string[]
  adCopy?: {
    primary: string
    secondary?: string
    callToAction: string
  }
  
  createdAt: Date
  isActive: boolean
  performance?: {
    impressions?: number
    clicks?: number
    conversions?: number
    ctr?: number
    cost?: number
  }
} 