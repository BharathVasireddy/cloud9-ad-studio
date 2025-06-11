'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Card, CardContent, CardHeader } from '../../../components/ui/Card'
import { 
  validateSignUpForm, 
  formatValidationErrors, 
  getPasswordStrength 
} from '../../../utils/authValidation'
import { AuthFormData } from '../../../types/auth'
import { Eye, EyeOff, ArrowRight, Sparkles, Check, X } from 'lucide-react'

export default function SignUpPage() {
  const { user, signUp, loading, error } = useAuth()
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
    confirmPassword: '',
    displayName: '',
    phoneNumber: ''
  })
  
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const passwordStrength = getPasswordStrength(formData.password)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    const validationErrors = validateSignUpForm(formData)
    if (validationErrors.length > 0) {
      setFormErrors(formatValidationErrors(validationErrors))
      return
    }

    try {
      setIsSubmitting(true)
      setFormErrors({})
      
      await signUp(formData.email, formData.password, formData.displayName, formData.phoneNumber)
      
      // Redirect to dashboard on successful sign up
      router.push('/dashboard')
    } catch (error) {
      // Error is handled by AuthContext
      console.error('Sign up error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const getPasswordStrengthColor = (score: number) => {
    const colors = ['red', 'orange', 'yellow', 'blue', 'green']
    return colors[score] || 'red'
  }

  const getPasswordStrengthWidth = (score: number) => {
    return `${(score / 4) * 100}%`
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
            Create your Cloud 9 Digital account
          </p>
        </div>

        {/* Sign Up Form */}
        <Card className="card-glass">
          <CardHeader>
            <h2 className="text-xl font-semibold text-white text-center">
              Create Account
            </h2>
            <p className="text-gray-400 text-center text-sm">
              Join the Cloud 9 Digital team
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

              {/* Display Name Field */}
              <div className="space-y-2">
                <label htmlFor="displayName" className="text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <Input
                  id="displayName"
                  name="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={formErrors.displayName?.length ? 'border-red-500 focus:border-red-500' : ''}
                />
                {formErrors.displayName?.map((error, index) => (
                  <p key={index} className="text-red-400 text-xs">{error}</p>
                ))}
              </div>

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

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-300">
                  Phone Number
                  <span className="text-gray-500 text-xs ml-1">(for WhatsApp login)</span>
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className={formErrors.phoneNumber?.length ? 'border-red-500 focus:border-red-500' : ''}
                />
                {formErrors.phoneNumber?.map((error, index) => (
                  <p key={index} className="text-red-400 text-xs">{error}</p>
                ))}
                <p className="text-xs text-gray-500">
                  We'll use this for future WhatsApp authentication features
                </p>
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
                    placeholder="Create a strong password"
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
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 bg-${getPasswordStrengthColor(passwordStrength.score)}-500`}
                          style={{ width: getPasswordStrengthWidth(passwordStrength.score) }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium text-${getPasswordStrengthColor(passwordStrength.score)}-400`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                  </div>
                )}
                
                {formErrors.password?.map((error, index) => (
                  <p key={index} className="text-red-400 text-xs">{error}</p>
                ))}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                    className={formErrors.confirmPassword?.length ? 'border-red-500 focus:border-red-500 pr-12' : 'pr-12'}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="flex items-center gap-2">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-xs">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 text-xs">Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
                
                {formErrors.confirmPassword?.map((error, index) => (
                  <p key={index} className="text-red-400 text-xs">{error}</p>
                ))}
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
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center">
                    Create Account
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-gray-800">
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <Link 
                    href="/auth/signin"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Sign in
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