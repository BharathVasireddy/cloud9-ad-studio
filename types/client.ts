/**
 * Client management types for Ad Studio
 */

// Service definition for client business offerings
export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'product' | 'service' | 'digital' | 'consulting' | 'other';
  url?: string;
}

// Enhanced client interface for Phase 2
export interface Client {
  id: string;
  userId: string;
  
  // Basic Information
  businessName: string;
  contactEmail?: string;
  city?: string;
  industry?: string;
  website?: string;
  description?: string;
  
  // Business Details
  services: Service[];
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Form data types
export interface CreateClientData {
  businessName: string;
  contactEmail?: string;
  city?: string;
  industry?: string;
  website?: string;
  description?: string;
  services: Omit<Service, 'id'>[];
}

export interface UpdateClientData extends Partial<CreateClientData> {}

// Client statistics
export interface ClientStats {
  totalClients: number;
  activeClients: number;
  recentClients: number;
  topIndustries: { industry: string; count: number }[];
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