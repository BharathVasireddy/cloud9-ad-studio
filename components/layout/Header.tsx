'use client'

import React from 'react'
import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'
import { Sparkles, LogOut, ArrowLeft } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
  backButtonHref?: string
  backButtonText?: string
}

export default function Header({ 
  title, 
  subtitle, 
  showBackButton = false, 
  backButtonHref = '/dashboard',
  backButtonText = 'Back to Dashboard'
}: HeaderProps) {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Navigation will be handled by the auth context
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left Side - Logo/Navigation */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            {showBackButton && (
              <Link href={backButtonHref} className="flex-shrink-0">
                <Button variant="outline" size="sm" className="flex items-center gap-2 whitespace-nowrap">
                  <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{backButtonText}</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
            )}
            
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                  <span className="text-gradient-animated">{title}</span>
                </h1>
                {subtitle && (
                  <p className="text-xs sm:text-sm text-gray-400 truncate hidden sm:block">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - User Menu */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* User Info - Hidden on mobile for space */}
            <div className="hidden lg:flex flex-col items-end min-w-0">
              <span className="text-sm text-gray-300 truncate max-w-[150px]">
                {user?.displayName || user?.email?.split('@')[0] || 'User'}
              </span>
              <span className="text-xs text-gray-500 truncate max-w-[150px]">
                {user?.email}
              </span>
            </div>

            {/* Sign Out Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 text-sm font-medium flex-shrink-0 min-w-0"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="hidden md:inline">Sign Out</span>
              <span className="md:hidden">Exit</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 