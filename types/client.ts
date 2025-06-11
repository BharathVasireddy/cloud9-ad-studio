/**
 * Client management types for Ad Studio
 */

export interface Client {
  id: string
  userId: string
  name: string
  industry: string
  website?: string
  description?: string
  targetAudience: string
  keyProducts?: string[]
  brand: {
    voiceTone: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'playful'
    colors?: string[]
    keywords?: string[]
    avoidWords?: string[]
  }
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

/**
 * Client creation data
 */
export interface CreateClientData {
  userId: string
  name: string
  industry: string
  website?: string
  description?: string
  targetAudience: string
  keyProducts?: string[]
  brand: {
    voiceTone: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'playful'
    colors?: string[]
    keywords?: string[]
    avoidWords?: string[]
  }
}

/**
 * Industry categories for client selection
 */
export type Industry = 
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'retail'
  | 'education'
  | 'real-estate'
  | 'food-beverage'
  | 'travel'
  | 'automotive'
  | 'entertainment'
  | 'non-profit'
  | 'other'

/**
 * Default brand settings
 */
export const DEFAULT_BRAND_SETTINGS = {
  voiceTone: 'professional' as const,
  colors: [],
  keywords: [],
  avoidWords: [],
} 