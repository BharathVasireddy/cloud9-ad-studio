import React from 'react'
import { clsx } from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'interactive'
  padding?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

/**
 * Reusable card component with hover effects
 * @param variant - Card style variant
 * @param padding - Card padding size
 * @param children - Card content
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  className,
  ...props
}) => {
  const baseClasses = 'card'
  
  const variantClasses = {
    default: '',
    hover: 'card-hover',
    interactive: 'card-hover cursor-pointer'
  }
  
  const paddingClasses = {
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  }

  const combinedClassName = clsx(
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className
  )

  return (
    <div
      className={combinedClassName}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Card header component
 * @param children - Header content
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('mb-3 sm:mb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Card content component
 * @param children - Content
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('', className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Card footer component
 * @param children - Footer content
 * @param className - Additional CSS classes
 * @param props - Additional div props
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-gray-700', className)}
      {...props}
    >
      {children}
    </div>
  )
} 