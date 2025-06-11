import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  DocumentData,
  FirestoreError 
} from 'firebase/firestore'
import { User as FirebaseUser } from 'firebase/auth'
import { db } from './firebase'
import { User, CreateUserData, DEFAULT_USER_PREFERENCES } from '../types/auth'

/**
 * Create a new user document in Firestore
 */
export async function createUserDocument(
  firebaseUser: FirebaseUser,
  additionalData?: Partial<CreateUserData>
): Promise<User> {
  if (!firebaseUser) throw new Error('Firebase user is required')
  
  const userRef = doc(db, 'users', firebaseUser.uid)
  
  try {
    // Check if user document already exists
    const userSnapshot = await getDoc(userRef)
    
    if (!userSnapshot.exists()) {
      // Create new user document
      const userData: CreateUserData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || additionalData?.displayName || '',
        phoneNumber: additionalData?.phoneNumber || '',
        photoURL: firebaseUser.photoURL || '',
        role: 'user',
        preferences: DEFAULT_USER_PREFERENCES,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...additionalData
      }
      
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      
      return {
        ...firebaseUser,
        id: firebaseUser.uid,
        ...userData
      } as User
    } else {
      // Return existing user data
      const existingData = userSnapshot.data() as CreateUserData
      return {
        ...firebaseUser,
        id: firebaseUser.uid,
        ...existingData,
        createdAt: existingData.createdAt instanceof Date 
          ? existingData.createdAt 
          : new Date(),
        updatedAt: existingData.updatedAt instanceof Date 
          ? existingData.updatedAt 
          : new Date()
      } as User
    }
  } catch (error) {
    console.error('Error creating user document:', error)
    throw new Error('Failed to create user document')
  }
}

/**
 * Get user document from Firestore
 */
export async function getUserDocument(uid: string): Promise<User | null> {
  if (!uid) return null
  
  try {
    const userRef = doc(db, 'users', uid)
    const userSnapshot = await getDoc(userRef)
    
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data() as CreateUserData
      return {
        id: uid,
        uid,
        email: userData.email,
        displayName: userData.displayName,
        phoneNumber: userData.phoneNumber,
        photoURL: userData.photoURL,
        role: userData.role,
        preferences: userData.preferences,
        createdAt: userData.createdAt instanceof Date 
          ? userData.createdAt 
          : new Date(),
        updatedAt: userData.updatedAt instanceof Date 
          ? userData.updatedAt 
          : new Date()
      } as User
    }
    
    return null
  } catch (error) {
    console.error('Error getting user document:', error)
    return null
  }
}

/**
 * Update user document in Firestore
 */
export async function updateUserDocument(
  uid: string, 
  updates: Partial<CreateUserData>
): Promise<void> {
  if (!uid) throw new Error('User ID is required')
  
  try {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error updating user document:', error)
    throw new Error('Failed to update user document')
  }
}

/**
 * Handle Firebase Auth errors and return user-friendly messages
 */
export function getAuthErrorMessage(error: any): string {
  if (!error?.code) return 'An unexpected error occurred'
  
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email address'
    case 'auth/wrong-password':
      return 'Incorrect password'
    case 'auth/email-already-in-use':
      return 'An account with this email already exists'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters'
    case 'auth/invalid-email':
      return 'Please enter a valid email address'
    case 'auth/user-disabled':
      return 'This account has been disabled'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection'
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled'
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled'
    default:
      return error.message || 'Authentication failed'
  }
}

/**
 * Handle Firestore errors and return user-friendly messages
 */
export function getFirestoreErrorMessage(error: FirestoreError | any): string {
  if (!error?.code) return 'An unexpected error occurred'
  
  switch (error.code) {
    case 'permission-denied':
      return 'You do not have permission to perform this action'
    case 'not-found':
      return 'The requested data was not found'
    case 'already-exists':
      return 'This data already exists'
    case 'resource-exhausted':
      return 'Too many requests. Please try again later'
    case 'failed-precondition':
      return 'Operation failed due to invalid state'
    case 'aborted':
      return 'Operation was aborted. Please try again'
    case 'out-of-range':
      return 'Invalid data provided'
    case 'unimplemented':
      return 'This feature is not yet available'
    case 'internal':
      return 'Internal server error. Please try again'
    case 'unavailable':
      return 'Service is temporarily unavailable'
    case 'data-loss':
      return 'Data corruption detected'
    default:
      return error.message || 'Database operation failed'
  }
} 