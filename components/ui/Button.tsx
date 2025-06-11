import React from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

/**
 * Reusable button component following design system
 * @param variant - Button style variant
 * @param size - Button size
 * @param loading - Loading state
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param disabled - Disabled state
 * @param props - Additional button props
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'btn-primary',
    outline: 'btn-outline', 
    secondary: 'btn-secondary',
    danger: 'btn-danger'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const combinedClassName = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    {
      'disabled:hover:scale-100': disabled || loading,
    },
    className
  )

  return (
    <button
      className={combinedClassName}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="loading-spinner mr-2" aria-hidden="true" />
      )}
      <span className={loading ? 'opacity-75' : ''}>
        {children}
      </span>
    </button>
  )
} 