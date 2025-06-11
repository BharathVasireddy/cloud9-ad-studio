import React from 'react'
import { clsx } from 'clsx'

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'white'
  text?: string
}

/**
 * Reusable loading spinner component
 * @param size - Spinner size
 * @param variant - Spinner color variant
 * @param text - Optional loading text
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  text,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }
  
  const variantClasses = {
    primary: 'border-[var(--color-text-muted)] border-t-[var(--color-accent-primary)]',
    secondary: 'border-[var(--color-text-muted)] border-t-[var(--color-accent-secondary)]',
    white: 'border-gray-300 border-t-white'
  }

  const spinnerClassName = clsx(
    'animate-spin rounded-full border-2',
    sizeClasses[size],
    variantClasses[variant]
  )

  const containerClassName = clsx(
    'flex items-center justify-center',
    text && 'gap-3',
    className
  )

  return (
    <div className={containerClassName} role="status" aria-live="polite" {...props}>
      <div className={spinnerClassName} aria-hidden="true" />
      {text && (
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">
          {text}
        </span>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

interface LoadingOverlayProps {
  show: boolean
  text?: string
  backdrop?: boolean
}

/**
 * Full-screen loading overlay component
 * @param show - Whether to show the overlay
 * @param text - Optional loading text
 * @param backdrop - Whether to show backdrop
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  show,
  text = 'Loading...',
  backdrop = true
}) => {
  if (!show) return null

  return (
    <div className={clsx(
      'fixed inset-0 z-50 flex items-center justify-center',
      backdrop && 'bg-[var(--color-bg-primary)] bg-opacity-80 backdrop-blur-sm'
    )}>
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" variant="primary" />
        <p className="text-lg font-medium text-[var(--color-text-primary)]">
          {text}
        </p>
      </div>
    </div>
  )
}

interface LoadingButtonProps {
  loading: boolean
  children: React.ReactNode
  loadingText?: string
}

/**
 * Button with built-in loading state
 * @param loading - Whether button is in loading state
 * @param children - Button content when not loading
 * @param loadingText - Text to show when loading
 */
export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  loadingText = 'Loading...'
}) => {
  return (
    <>
      {loading ? (
        <LoadingSpinner size="sm" text={loadingText} />
      ) : (
        children
      )}
    </>
  )
} 