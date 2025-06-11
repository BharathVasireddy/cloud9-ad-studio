import { User as FirebaseUser } from 'firebase/auth'

/**
 * Extended user interface combining Firebase User with app-specific data
 */
export interface User extends Omit<FirebaseUser, 'metadata'> {
  id: string
  email: string
  displayName?: string
  phoneNumber?: string
  photoURL?: string
  createdAt: Date
  updatedAt: Date
  role: 'user' | 'admin'
  preferences: UserPreferences
}

/**
 * User preferences for the application
 */
export interface UserPreferences {
  theme: 'dark' | 'light'
  defaultPlatform: 'google' | 'facebook' | 'both'
  autoSave: boolean
  notifications: boolean
}

/**
 * Authentication context state
 */
export interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<User>
  signUp: (email: string, password: string, displayName?: string, phoneNumber?: string) => Promise<User>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
}

/**
 * Authentication form data
 */
export interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
  displayName?: string
  phoneNumber?: string
  rememberMe?: boolean
}

/**
 * Authentication error types
 */
export type AuthError = {
  code: string
  message: string
  field?: 'email' | 'password' | 'phoneNumber' | 'general'
}

/**
 * User creation data for Firestore
 */
export interface CreateUserData {
  uid: string
  email: string
  displayName?: string
  phoneNumber?: string
  photoURL?: string
  role: 'user' | 'admin'
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

/**
 * Default user preferences
 */
export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  theme: 'dark',
  defaultPlatform: 'google',
  autoSave: true,
  notifications: true,
} 