'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import Header from '../../components/layout/Header'
import { Sparkles, Search, Calendar, ExternalLink } from 'lucide-react'

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock generation history data
  const generationHistory = [
    {
      id: 1,
      platform: 'Google Ads',
      client: 'Tech Startup Inc.',
      headline: 'Revolutionary AI Software Solutions',
      description: 'Transform your business with cutting-edge AI technology. Get started today!',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'active'
    },
    {
      id: 2,
      platform: 'Facebook Ads',
      client: 'E-commerce Store',
      headline: 'Premium Products, Unbeatable Prices',
      description: 'Discover our exclusive collection of premium products at prices that won\'t break the bank.',
      createdAt: '2024-01-14T14:20:00Z',
      status: 'draft'
    },
    {
      id: 3,
      platform: 'Google Ads',
      client: 'Local Restaurant',
      headline: 'Fresh Ingredients, Bold Flavors',
      description: 'Experience authentic cuisine made with the freshest local ingredients.',
      createdAt: '2024-01-13T09:15:00Z',
      status: 'active'
    }
  ]

  const filteredHistory = generationHistory.filter(item =>
    item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.platform.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 font-['Plus_Jakarta_Sans']">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section - Centered */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome to Ad Studio
          </h2>
          <p className="text-gray-400">
            Create high-converting Google and Facebook ads with AI assistance
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your ad generations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Recent Activity - Generation History */}
        <Card className="card-gradient">
          <CardHeader>
            <h3 className="text-xl font-semibold text-white mb-2">Recent Activity</h3>
            <p className="text-gray-400">Your latest ad copy generations and campaigns</p>
          </CardHeader>
          <CardContent>
            {filteredHistory.length > 0 ? (
              <div className="space-y-4">
                {filteredHistory.map((generation) => (
                  <div
                    key={generation.id}
                    className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700/50 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-blue-400">
                          {generation.platform}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-sm text-gray-400">
                          {generation.client}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          generation.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {generation.status}
                        </span>
                      </div>
                      <h4 className="text-white font-medium mb-1 truncate">
                        {generation.headline}
                      </h4>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {generation.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(generation.createdAt)}
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {searchQuery ? 'No results found' : 'Ready to Create Amazing Ads?'}
                </h4>
                <p className="text-gray-400 mb-6 text-center max-w-md">
                  {searchQuery 
                    ? `No generations found matching "${searchQuery}". Try a different search term.`
                    : 'Generate high-converting ad copy for Google and Facebook with AI assistance. Your campaigns will appear here once you get started.'
                  }
                </p>
                {!searchQuery && (
                                <Link href="/generate" className="inline-block">
                <Button variant="primary" className="flex-shrink-0 px-4 sm:px-6 py-3 font-semibold">
                  <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-medium">Create Your First Campaign</span>
                </Button>
              </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 