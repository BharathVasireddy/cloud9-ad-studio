import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase app (only if not already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Auth
export const auth = getAuth(app)

// Initialize Firestore
export const db = getFirestore(app)

// Initialize Analytics (only in browser environment and if supported)
export const analytics = typeof window !== 'undefined' ? 
  isSupported().then(yes => yes ? getAnalytics(app) : null) : null

// Development environment setup with emulators (DISABLED - using production Firebase)
// if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
//   try {
//     // Connect to Auth emulator (will fail silently if already connected)
//     connectAuthEmulator(auth, 'http://localhost:9099')
//   } catch (error) {
//     // Already connected or emulator not available
//   }

//   try {
//     // Connect to Firestore emulator (will fail silently if already connected)
//     connectFirestoreEmulator(db, 'localhost', 8080)
//   } catch (error) {
//     // Already connected or emulator not available
//   }
// }

export default app

// Helper functions for common Firebase operations
export const getCurrentUser = () => {
  return auth.currentUser
}

export const isUserAuthenticated = () => {
  return !!auth.currentUser
}

// Collection references for type safety
export const COLLECTIONS = {
  USERS: 'users',
  CLIENTS: 'clients', 
  GENERATIONS: 'generations'
} as const

// Firestore helpers with proper typing
export const getUserDoc = (userId: string) => `${COLLECTIONS.USERS}/${userId}`
export const getClientDoc = (clientId: string) => `${COLLECTIONS.CLIENTS}/${clientId}`
export const getGenerationDoc = (generationId: string) => `${COLLECTIONS.GENERATIONS}/${generationId}` 