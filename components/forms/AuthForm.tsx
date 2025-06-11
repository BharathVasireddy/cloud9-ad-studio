'use client'

import React from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Eye, EyeOff, ArrowRight, Check, X } from 'lucide-react'
import { AuthFormData } from '../../types/auth'
import { getPasswordStrength } from '../../utils/authValidation'

interface AuthFormProps {
  type: 'signin' | 'signup'
  formData: AuthFormData
  formErrors: { [key: string]: string[] }
  showPassword: boolean
  showConfirmPassword?: boolean
  isSubmitting: boolean
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onTogglePassword: () => void
  onToggleConfirmPassword?: () => void
}

export const AuthForm: React.FC<AuthFormProps> = ({
  type,
  formData,
  formErrors,
  showPassword,
  showConfirmPassword = false,
  isSubmitting,
  onInputChange,
  onSubmit,
  onTogglePassword,
  onToggleConfirmPassword
}) => {
  const isSignUp = type === 'signup'
  const passwordStrength = getPasswordStrength(formData.password)

  const getPasswordStrengthColor = (score: number) => {
    const colors = ['red', 'orange', 'yellow', 'blue', 'green']
    return colors[score] || 'red'
  }

  const getPasswordStrengthWidth = (score: number) => {
    return `${(score / 4) * 100}%`
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Display Name Field (Sign Up Only) */}
      {isSignUp && (
        <div className="space-y-2">
          <label htmlFor="displayName" className="text-sm font-medium text-gray-300">
            Full Name
          </label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            value={formData.displayName || ''}
            onChange={onInputChange}
            placeholder="John Doe"
            className={formErrors.displayName?.length ? 'border-red-500 focus:border-red-500' : ''}
          />
          {formErrors.displayName?.map((error, index) => (
            <p key={index} className="text-red-400 text-xs">{error}</p>
          ))}
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
          onChange={onInputChange}
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
            onChange={onInputChange}
            placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
            required
            className={formErrors.password?.length ? 'border-red-500 focus:border-red-500 pr-12' : 'pr-12'}
          />
          <button
            type="button"
            onClick={onTogglePassword}
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
        
        {/* Password Strength Indicator (Sign Up Only) */}
        {isSignUp && formData.password && (
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

      {/* Confirm Password Field (Sign Up Only) */}
      {isSignUp && (
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword || ''}
              onChange={onInputChange}
              placeholder="Confirm your password"
              required
              className={formErrors.confirmPassword?.length ? 'border-red-500 focus:border-red-500 pr-12' : 'pr-12'}
            />
            {onToggleConfirmPassword && (
              <button
                type="button"
                onClick={onToggleConfirmPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
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
      )}

      {/* Remember Me (Sign In Only) */}
      {!isSignUp && (
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe || false}
              onChange={onInputChange}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
            />
            <span className="text-sm text-gray-400">Remember me</span>
          </label>
          
          <a 
            href="/auth/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </a>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        className="w-full group"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {isSignUp ? 'Creating account...' : 'Signing in...'}
          </div>
        ) : (
          <div className="flex items-center gap-2 justify-center">
            {isSignUp ? 'Create Account' : 'Sign In'}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </Button>
    </form>
  )
} 