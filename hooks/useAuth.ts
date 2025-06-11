import { useAuth as useAuthContext } from '../contexts/AuthContext'

/**
 * Custom hook for accessing authentication state and methods
 * 
 * @returns AuthContextType - Authentication state and methods
 * @throws Error if used outside of AuthProvider
 * 
 * @example
 * ```tsx
 * import { useAuth } from '../hooks/useAuth'
 * 
 * function MyComponent() {
 *   const { user, signIn, signOut, loading } = useAuth()
 *   
 *   if (loading) return <div>Loading...</div>
 *   
 *   return (
 *     <div>
 *       {user ? (
 *         <button onClick={signOut}>Sign Out</button>
 *       ) : (
 *         <button onClick={() => signIn(email, password)}>Sign In</button>
 *       )}
 *     </div>
 *   )
 * }
 * ```
 */
export const useAuth = useAuthContext

/**
 * Re-export all authentication-related exports for convenience
 */
export { AuthProvider, withAuth } from '../contexts/AuthContext'
export type { User, AuthContextType, AuthFormData, AuthError } from '../types/auth' 