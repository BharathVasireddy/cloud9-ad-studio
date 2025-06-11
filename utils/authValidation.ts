import { AuthFormData, AuthError } from '../types/auth'

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }
  
  if (password.length > 128) {
    errors.push('Password must be less than 128 characters')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate display name
 */
export function validateDisplayName(displayName: string): {
  isValid: boolean
  error?: string
} {
  if (!displayName.trim()) {
    return {
      isValid: false,
      error: 'Display name is required'
    }
  }
  
  if (displayName.length < 2) {
    return {
      isValid: false,
      error: 'Display name must be at least 2 characters'
    }
  }
  
  if (displayName.length > 50) {
    return {
      isValid: false,
      error: 'Display name must be less than 50 characters'
    }
  }
  
  // Check for invalid characters
  if (!/^[a-zA-Z0-9\s\-._]+$/.test(displayName)) {
    return {
      isValid: false,
      error: 'Display name can only contain letters, numbers, spaces, hyphens, periods, and underscores'
    }
  }
  
  return { isValid: true }
}

/**
 * Validate phone number format
 */
export function validatePhoneNumber(phoneNumber: string): {
  isValid: boolean
  error?: string
} {
  if (!phoneNumber.trim()) {
    return { isValid: true } // Phone number is optional
  }
  
  // Remove all non-digit characters for validation
  const cleanNumber = phoneNumber.replace(/\D/g, '')
  
  // Must be between 10-15 digits (international standard)
  if (cleanNumber.length < 10) {
    return {
      isValid: false,
      error: 'Phone number must be at least 10 digits'
    }
  }
  
  if (cleanNumber.length > 15) {
    return {
      isValid: false,
      error: 'Phone number must be less than 15 digits'
    }
  }
  
  // Basic format validation - should contain only digits, spaces, parentheses, hyphens, and plus sign
  if (!/^[\d\s\(\)\-\+]+$/.test(phoneNumber)) {
    return {
      isValid: false,
      error: 'Phone number can only contain digits, spaces, parentheses, hyphens, and plus signs'
    }
  }
  
  return { isValid: true }
}

/**
 * Validate sign in form data
 */
export function validateSignInForm(data: AuthFormData): AuthError[] {
  const errors: AuthError[] = []
  
  // Validate email
  if (!data.email) {
    errors.push({
      code: 'missing-email',
      message: 'Email is required',
      field: 'email'
    })
  } else if (!validateEmail(data.email)) {
    errors.push({
      code: 'invalid-email',
      message: 'Please enter a valid email address',
      field: 'email'
    })
  }
  
  // Validate password
  if (!data.password) {
    errors.push({
      code: 'missing-password',
      message: 'Password is required',
      field: 'password'
    })
  }
  
  return errors
}

/**
 * Validate sign up form data
 */
export function validateSignUpForm(data: AuthFormData): AuthError[] {
  const errors: AuthError[] = []
  
  // Validate email
  if (!data.email) {
    errors.push({
      code: 'missing-email',
      message: 'Email is required',
      field: 'email'
    })
  } else if (!validateEmail(data.email)) {
    errors.push({
      code: 'invalid-email',
      message: 'Please enter a valid email address',
      field: 'email'
    })
  }
  
  // Validate password
  if (!data.password) {
    errors.push({
      code: 'missing-password',
      message: 'Password is required',
      field: 'password'
    })
  } else {
    const passwordValidation = validatePassword(data.password)
    if (!passwordValidation.isValid) {
      passwordValidation.errors.forEach(error => {
        errors.push({
          code: 'weak-password',
          message: error,
          field: 'password'
        })
      })
    }
  }
  
  // Validate password confirmation
  if (!data.confirmPassword) {
    errors.push({
      code: 'missing-confirm-password',
      message: 'Please confirm your password',
      field: 'password'
    })
  } else if (data.password !== data.confirmPassword) {
    errors.push({
      code: 'password-mismatch',
      message: 'Passwords do not match',
      field: 'password'
    })
  }
  
  // Validate display name if provided
  if (data.displayName) {
    const displayNameValidation = validateDisplayName(data.displayName)
    if (!displayNameValidation.isValid) {
      errors.push({
        code: 'invalid-display-name',
        message: displayNameValidation.error!,
        field: 'general'
      })
    }
  }
  
  // Validate phone number if provided
  if (data.phoneNumber) {
    const phoneValidation = validatePhoneNumber(data.phoneNumber)
    if (!phoneValidation.isValid) {
      errors.push({
        code: 'invalid-phone-number',
        message: phoneValidation.error!,
        field: 'phoneNumber'
      })
    }
  }
  
  return errors
}

/**
 * Get password strength score (0-4)
 */
export function getPasswordStrength(password: string): {
  score: number
  label: string
  color: string
} {
  let score = 0
  
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^a-zA-Z\d]/.test(password)) score++
  
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['red', 'orange', 'yellow', 'blue', 'green']
  
  return {
    score,
    label: labels[score] || 'Very Weak',
    color: colors[score] || 'red'
  }
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: AuthError[]): {
  [field: string]: string[]
} {
  return errors.reduce((acc, error) => {
    const field = error.field || 'general'
    if (!acc[field]) {
      acc[field] = []
    }
    acc[field].push(error.message)
    return acc
  }, {} as { [field: string]: string[] })
}

/**
 * Check if email is from Cloud 9 Digital domain (optional restriction)
 */
export function isCloud9Email(email: string): boolean {
  return email.toLowerCase().endsWith('@cloud9digital.com')
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
} 