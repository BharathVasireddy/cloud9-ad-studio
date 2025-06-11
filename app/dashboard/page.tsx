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
      <header className="border-b border-gray-800 bg-gray-900/50">
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
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">
                Welcome, {user?.displayName || user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Analytics</h3>
              <p className="text-gray-400">
                Track performance and optimization insights
              </p>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-gradient">
          <CardHeader>
            <h3 className="text-xl font-semibold text-white mb-2">Recent Activity</h3>
            <p className="text-gray-400">Your latest ad generation sessions</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-400 mb-4">No campaigns yet</p>
              <Button variant="primary">
                Create Your First Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 