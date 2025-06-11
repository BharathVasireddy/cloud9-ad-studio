'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth'
import { auth } from '../lib/firebase'
import { 
  createUserDocument, 
  getUserDocument, 
  updateUserDocument,
  getAuthErrorMessage 
} from '../lib/firebaseUtils'
import { AuthContextType, User, DEFAULT_USER_PREFERENCES } from '../types/auth'
import { withTimeout } from '../utils/timeout'

/**
 * Authentication Context for managing user state and authentication operations
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

/**
 * Authentication Provider Component
 * Manages user state and provides authentication methods
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Clear any existing errors
   */
  const clearError = () => setError(null)

  /**
   * Convert Firebase User to our User type - optimized for speed
   */
  const createUserFromFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User> => {
    // Return basic user data immediately for fast sign-in
    const basicUser = {
      id: firebaseUser.uid,
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || '',
      role: 'user' as const,
      preferences: DEFAULT_USER_PREFERENCES,
      createdAt: new Date(),
      updatedAt: new Date()
    } as User
    
    // Handle Firestore operations in background (non-blocking)
    setTimeout(async () => {
      try {
        const userDoc = await getUserDocument(firebaseUser.uid)
        if (!userDoc) {
          await createUserDocument(firebaseUser)
        }
      } catch (error) {
        console.error('Background user document operation failed:', error)
      }
    }, 50) // Minimal delay
    
    return basicUser
  }

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string): Promise<User> => {
    try {
      clearError()
      setLoading(true)

      if (!auth) {
        throw new Error('Firebase authentication is not available. Please check your configuration.')
      }

      // Fast Firebase authentication
      const { user: firebaseUser } = await withTimeout(
        signInWithEmailAndPassword(auth, email, password),
        10000 // 10 second timeout
      )
      
      // Immediate user data creation (no Firestore dependency)
      const userData = await createUserFromFirebaseUser(firebaseUser)
      
      setUser(userData)
      return userData
    } catch (error: any) {
      console.error('Sign in error:', error)
      const errorMessage = getAuthErrorMessage(error)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Sign up with email and password
   */
  const signUp = async (email: string, password: string, displayName?: string, phoneNumber?: string): Promise<User> => {
    try {
      clearError()
      setLoading(true)

      if (!auth) {
        throw new Error('Firebase authentication is not available. Please check your configuration.')
      }

      // Create Firebase user
      const { user: firebaseUser } = await withTimeout(
        createUserWithEmailAndPassword(auth, email, password),
        10000 // 10 second timeout
      )
      
      // Update display name if provided
      if (displayName) {
        await withTimeout(
          updateProfile(firebaseUser, { displayName }),
          5000 // 5 second timeout
        )
      }

      // Create user with additional data (includes Firestore creation)
      const userData = await withTimeout(
        createUserDocument(firebaseUser, { displayName, phoneNumber }),
        8000 // 8 second timeout
      )
      
      setUser(userData)
      return userData
    } catch (error: any) {
      console.error('Sign up error:', error)
      const errorMessage = getAuthErrorMessage(error)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Sign out current user
   */
  const signOut = async (): Promise<void> => {
    try {
      clearError()
      setLoading(true)
      
      if (!auth) {
        throw new Error('Firebase authentication is not available. Please check your configuration.')
      }
      
      await firebaseSignOut(auth)
      setUser(null)
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Send password reset email
   */
  const resetPassword = async (email: string): Promise<void> => {
    try {
      clearError()
      
      if (!auth) {
        throw new Error('Firebase authentication is not available. Please check your configuration.')
      }
      
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error)
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  /**
   * Update user profile
   */
  const updateUserProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      clearError()
      
      if (!user) throw new Error('No user is signed in')

      // Update Firebase profile if needed
      if (updates.displayName || updates.photoURL) {
        if (!auth || !auth.currentUser) {
          throw new Error('Firebase authentication is not available or user is not signed in.')
        }
        
        await updateProfile(auth.currentUser, {
          displayName: updates.displayName,
          photoURL: updates.photoURL
        })
      }

      // Update Firestore document
      await updateUserDocument(user.uid, updates)

      // Update local user state
      setUser(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null)
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error)
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  /**
   * Listen for authentication state changes
   */
  useEffect(() => {
    // Don't set up auth listener if Firebase auth is not available
    if (!auth) {
      console.warn('Firebase auth is not available. Authentication will not work.')
      setLoading(false)
      setUser(null)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setLoading(true)
        clearError()

        if (firebaseUser) {
          // User is signed in
          const userData = await createUserFromFirebaseUser(firebaseUser)
          setUser(userData)
        } else {
          // User is signed out
          setUser(null)
        }
      } catch (error) {
        console.error('Auth state change error:', error)
        setError('Failed to load user data')
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    // Cleanup subscription
    return () => unsubscribe()
  }, [])

  /**
   * Context value with all authentication methods and state
   */
  const value: AuthContextType = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile: updateUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Custom hook to use the AuthContext
 * Throws error if used outside of AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

/**
 * Higher-order component for protecting routes that require authentication
 */
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth()

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )
    }

    if (!user) {
      // Redirect to sign in - you can customize this behavior
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin'
      }
      return null
    }

    return <Component {...props} />
  }
} 