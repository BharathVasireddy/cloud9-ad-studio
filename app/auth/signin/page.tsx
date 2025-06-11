'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Card, CardContent, CardHeader } from '../../../components/ui/Card'
import { validateSignInForm, formatValidationErrors } from '../../../utils/authValidation'
import { AuthFormData } from '../../../types/auth'
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'

export default function SignInPage() {
  const { user, signIn, loading, error } = useAuth()
  const router = useRouter()
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (user && !loading) {
      router.replace('/dashboard')
    }
  }, [user, loading, router])

  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear field-specific errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: []
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validationErrors = validateSignInForm(formData)
    if (validationErrors.length > 0) {
      setFormErrors(formatValidationErrors(validationErrors))
      return
    }

    try {
      setIsSubmitting(true)
      setFormErrors({})
      
      await signIn(formData.email, formData.password)
      
      // Redirect to dashboard on successful sign in
      router.push('/dashboard')
    } catch (error) {
      // Error is handled by AuthContext
      console.error('Sign in error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Show loading state while checking authentication or redirecting
  if (loading || user) {
    return (
      <div className="min-h-screen bg-gray-950 font-['Plus_Jakarta_Sans'] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">
            {user ? 'Redirecting to dashboard...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 font-['Plus_Jakarta_Sans'] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">
              <span className="text-gradient-animated">Ad Studio</span>
            </h1>
          </div>
          <p className="text-gray-400">
            Sign in to your Cloud 9 Digital account
          </p>
        </div>

        {/* Sign In Form */}
        <Card className="card-glass">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white text-center">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-center text-sm">
              Enter your credentials to access Ad Studio
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Global Error Message */}
              {error && (
                <div className="p-4 rounded-lg bg-red-900/20 border border-red-500/30">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  className={formErrors.email?.length ? 'border-red-500 focus:border-red-500' : ''}
                />
                {formErrors.email?.map((error, index) => (
                  <p key={index} className="text-red-400 text-xs">{error}</p>
                ))}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    className={formErrors.password?.length ? 'border-red-500 focus:border-red-500 pr-12' : 'pr-12'}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {formErrors.password?.map((error, index) => (
                  <p key={index} className="text-red-400 text-xs">{error}</p>
                ))}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                  />
                  <span className="text-sm text-gray-400">Remember me</span>
                </label>
                
                <Link 
                  href="/auth/forgot-password"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full group"
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center">
                    Sign In
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-gray-800">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <Link 
                    href="/auth/signup"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            Internal use only • Cloud 9 Digital team access
          </p>
        </div>
      </div>
    </div>
  )
} 