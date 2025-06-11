import React from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'error' | 'success'
}

/**
 * Reusable input component with validation styles
 * @param label - Input label text
 * @param error - Error message to display
 * @param helperText - Helper text below input
 * @param variant - Input style variant
 * @param className - Additional CSS classes
 * @param props - Additional input props
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const baseClasses = 'input-field'
  
  const variantClasses = {
    default: '',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
  }

  const combinedClassName = clsx(
    baseClasses,
    variantClasses[variant],
    className
  )

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-white mb-1.5 sm:mb-2"
        >
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        className={combinedClassName}
        aria-invalid={variant === 'error'}
        aria-describedby={
          error ? `${inputId}-error` : 
          helperText ? `${inputId}-helper` : undefined
        }
        {...props}
      />
      
      {error && (
        <p 
          id={`${inputId}-error`}
          className="mt-1 text-xs sm:text-sm text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p 
          id={`${inputId}-helper`}
          className="mt-1 text-xs sm:text-sm text-gray-400"
        >
          {helperText}
        </p>
      )}
    </div>
  )
} 