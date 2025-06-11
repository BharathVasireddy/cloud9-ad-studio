'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../ui/Button'
import { Sparkles, ArrowLeft, User, LogOut, Settings, ChevronDown } from 'lucide-react'

interface HeaderProps {
  title: string
  showBackButton?: boolean
  backButtonHref?: string
  backButtonText?: string
}

export default function Header({ 
  title, 
  showBackButton = false, 
  backButtonHref = '/dashboard',
  backButtonText = 'Back to Dashboard'
}: HeaderProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    try {
      setIsDropdownOpen(false)
      await signOut()
      // Force clear any cached router data and navigate to home
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
      // Even if sign out fails, try to redirect
      window.location.href = '/'
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
              <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                <span className="text-gradient-animated">{title}</span>
              </h1>
            </div>
          </div>

          {/* Right Side - User Dropdown */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:flex flex-col items-start min-w-0">
                <span className="text-sm text-white font-medium truncate max-w-[120px]">
                  {user?.displayName || user?.email?.split('@')[0] || 'User'}
                </span>
                <span className="text-xs text-gray-400 truncate max-w-[120px]">
                  {user?.email}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false)
                      // Add profile navigation here when profile page is created
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-red-400 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 