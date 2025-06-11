'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import Header from '../../components/layout/Header'
import { Sparkles, Plus, Users, BarChart3 } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950 font-['Plus_Jakarta_Sans']">
      <Header />

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
              <Link href="/generate">
                <Button variant="primary" className="w-full">
                  Get Started
                </Button>
              </Link>
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
              <Link href="/generate" className="inline-block">
                <Button variant="primary" className="flex-shrink-0 px-4 sm:px-6 py-3 font-semibold whitespace-nowrap min-w-0">
                  <Plus className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-medium">Create Your First Campaign</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 