import React from 'react'
import { clsx } from 'clsx'

interface CharacterCounterProps {
  text: string
  maxLength: number
  warningThreshold?: number
  label?: string
  showCount?: boolean
  className?: string
}

/**
 * Character counter component for Google Ads compliance
 * @param text - Text to count characters for
 * @param maxLength - Maximum allowed characters
 * @param warningThreshold - Character count to show warning (default: 80% of max)
 * @param label - Label for the counter
 * @param showCount - Whether to show the actual count
 * @param className - Additional CSS classes
 */
export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  text,
  maxLength,
  warningThreshold,
  label,
  showCount = true,
  className
}) => {
  const currentLength = text.length
  const threshold = warningThreshold || Math.floor(maxLength * 0.8)
  
  const getStatus = () => {
    if (currentLength > maxLength) return 'danger'
    if (currentLength >= threshold) return 'warning'
    return 'ok'
  }
  
  const status = getStatus()
  
  const statusClasses = {
    ok: 'char-counter-ok',
    warning: 'char-counter-warning', 
    danger: 'char-counter-danger'
  }
  
  const statusIcons = {
    ok: '✓',
    warning: '⚠',
    danger: '✗'
  }

  const combinedClassName = clsx(
    'char-counter',
    statusClasses[status],
    className
  )

  return (
    <div className={combinedClassName}>
      <span className="mr-1" aria-hidden="true">
        {statusIcons[status]}
      </span>
      {label && <span className="mr-1">{label}:</span>}
      {showCount && (
        <span>
          {currentLength}/{maxLength}
        </span>
      )}
      <span className="sr-only">
        {currentLength} of {maxLength} characters used
        {status === 'danger' && ', exceeds maximum'}
        {status === 'warning' && ', approaching maximum'}
      </span>
    </div>
  )
}

interface GoogleAdsCounterProps {
  headlines: string[]
  descriptions: string[]
  className?: string
}

/**
 * Comprehensive Google Ads compliance counter
 * @param headlines - Array of headlines to check
 * @param descriptions - Array of descriptions to check
 * @param className - Additional CSS classes
 */
export const GoogleAdsCounter: React.FC<GoogleAdsCounterProps> = ({
  headlines,
  descriptions,
  className
}) => {
  const HEADLINE_MAX_LENGTH = 30
  const DESCRIPTION_MAX_LENGTH = 90
  const MAX_HEADLINES = 15
  const MAX_DESCRIPTIONS = 4

  const hasExclamationMarks = (text: string) => text.includes('!')
  
  const getComplianceStatus = () => {
    // Check headlines
    const headlineIssues = headlines.some(h => 
      h.length > HEADLINE_MAX_LENGTH || hasExclamationMarks(h)
    )
    
    // Check descriptions
    const descriptionIssues = descriptions.some(d => 
      d.length > DESCRIPTION_MAX_LENGTH || hasExclamationMarks(d)
    )
    
    // Check counts
    const countIssues = headlines.length > MAX_HEADLINES || descriptions.length > MAX_DESCRIPTIONS
    
    if (headlineIssues || descriptionIssues || countIssues) return 'invalid'
    if (headlines.length === 0 || descriptions.length === 0) return 'warning'
    return 'valid'
  }

  const complianceStatus = getComplianceStatus()
  
  const statusClasses = {
    valid: 'compliance-valid',
    warning: 'compliance-warning',
    invalid: 'compliance-invalid'
  }

  return (
    <div className={clsx('space-y-4', className)}>
      {/* Headlines Section */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
          Headlines ({headlines.length}/{MAX_HEADLINES})
        </h4>
        <div className="space-y-2">
          {headlines.map((headline, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)] truncate flex-1 mr-2">
                {headline || `Headline ${index + 1}`}
              </span>
              <CharacterCounter
                text={headline}
                maxLength={HEADLINE_MAX_LENGTH}
                showCount={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Descriptions Section */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">
          Descriptions ({descriptions.length}/{MAX_DESCRIPTIONS})
        </h4>
        <div className="space-y-2">
          {descriptions.map((description, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)] truncate flex-1 mr-2">
                {description || `Description ${index + 1}`}
              </span>
              <CharacterCounter
                text={description}
                maxLength={DESCRIPTION_MAX_LENGTH}
                showCount={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overall Compliance Status */}
      <div className={clsx('compliance-indicator', statusClasses[complianceStatus])}>
        {complianceStatus === 'valid' && '✓ Google Ads Compliant'}
        {complianceStatus === 'warning' && '⚠ Incomplete'}
        {complianceStatus === 'invalid' && '✗ Policy Violations'}
      </div>
    </div>
  )
} 