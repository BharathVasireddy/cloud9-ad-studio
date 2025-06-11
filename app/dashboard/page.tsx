'use client'

import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/ui/Button'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Sparkles, Plus, Users, BarChart3, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">
                <span className="text-gradient-animated">Ad Studio</span>
              </h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-gray-400 text-sm hidden lg:block truncate max-w-[120px]">
                Welcome, {user?.displayName || user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex-shrink-0 flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 text-sm"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline font-medium">Sign Out</span>
                <span className="md:hidden font-medium">Exit</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to Ad Studio
          </h2>
          <p className="text-gray-400">
            Create high-converting Google and Facebook ads with AI assistance
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="card-gradient hover-lift">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Create New Campaign</h3>
              <p className="text-gray-400">
                Start generating ad copy for your next campaign
              </p>
            </CardHeader>
            <CardContent>
              <Button variant="primary" className="w-full">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient hover-lift">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Manage Clients</h3>
              <p className="text-gray-400">
                Organize campaigns by client and project
              </p>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Clients
              </Button>
            </CardContent>
          </Card>

          <Card className="card-gradient hover-lift">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Generation History</h3>
              <p className="text-gray-400">
                View and reuse your previous ad copy generations
              </p>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-gradient">
          <CardHeader>
            <h3 className="text-xl font-semibold text-white mb-2">Recent Activity</h3>
            <p className="text-gray-400">Your latest ad copy generations and campaigns</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Ready to Create Amazing Ads?</h4>
              <p className="text-gray-400 mb-6 text-center max-w-md">
                Generate high-converting ad copy for Google and Facebook with AI assistance. Your campaigns will appear here once you get started.
              </p>
              <Button variant="primary" className="flex-shrink-0 px-6 py-3 font-semibold whitespace-nowrap">
                <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base">Create Your First Campaign</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 