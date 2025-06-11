'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import Header from '../../components/layout/Header'
import { 
  Search, 
  Calendar, 
  ExternalLink, 
  Filter, 
  Download, 
  Copy,
  MoreHorizontal,
  Facebook,
  Chrome,
  CheckCircle,
  Clock,
  Archive
} from 'lucide-react'

interface Generation {
  id: number
  platform: 'Google Ads' | 'Facebook Ads'
  client: string
  campaign: string
  headlines: string[]
  descriptions: string[]
  createdAt: string
  status: 'active' | 'draft' | 'archived'
  performance?: {
    impressions: number
    clicks: number
    ctr: number
  }
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedClient, setSelectedClient] = useState<string>('all')
  const [copiedId, setCopiedId] = useState<number | null>(null)

  // Mock comprehensive generation history data
  const generationHistory: Generation[] = [
    {
      id: 1,
      platform: 'Google Ads',
      client: 'Tech Startup Inc.',
      campaign: 'AI Software Launch',
      headlines: ['Revolutionary AI Software Solutions', 'Transform Business with AI', 'AI-Powered Efficiency Tools'],
      descriptions: ['Transform your business with cutting-edge AI technology. Get started today and see results!', 'Boost productivity with our advanced AI solutions designed for modern businesses.'],
      createdAt: '2024-01-15T10:30:00Z',
      status: 'active',
      performance: {
        impressions: 15420,
        clicks: 892,
        ctr: 5.78
      }
    },
    {
      id: 2,
      platform: 'Facebook Ads',
      client: 'E-commerce Store',
      campaign: 'Holiday Sale Campaign',
      headlines: ['Premium Products, Unbeatable Prices', 'Limited Time Holiday Offers', 'Shop Premium Collection Now'],
      descriptions: ['Discover our exclusive collection of premium products at prices that won\'t break the bank. Limited time holiday offers available now!'],
      createdAt: '2024-01-14T14:20:00Z',
      status: 'draft',
      performance: {
        impressions: 8930,
        clicks: 456,
        ctr: 5.11
      }
    },
    {
      id: 3,
      platform: 'Google Ads',
      client: 'Local Restaurant',
      campaign: 'Fresh Menu Promotion',
      headlines: ['Fresh Ingredients, Bold Flavors', 'Authentic Local Cuisine', 'Farm-to-Table Dining'],
      descriptions: ['Experience authentic cuisine made with the freshest local ingredients. Book your table today!', 'Savor bold flavors and fresh ingredients in every dish we serve.'],
      createdAt: '2024-01-13T09:15:00Z',
      status: 'active',
      performance: {
        impressions: 3240,
        clicks: 234,
        ctr: 7.22
      }
    },
    {
      id: 4,
      platform: 'Facebook Ads',
      client: 'Tech Startup Inc.',
      campaign: 'Beta User Acquisition',
      headlines: ['Be First to Try Revolutionary AI', 'Join Exclusive Beta Program', 'Early Access Available Now'],
      descriptions: ['Get exclusive early access to our revolutionary AI platform. Join our beta program and shape the future of business automation.'],
      createdAt: '2024-01-12T16:45:00Z',
      status: 'archived'
    },
    {
      id: 5,
      platform: 'Google Ads',
      client: 'Fitness Studio',
      campaign: 'New Year Membership Drive',
      headlines: ['Transform Your Fitness Journey', 'New Year, New You Program', 'Personal Training Available'],
      descriptions: ['Start your fitness transformation with our expert trainers and state-of-the-art equipment.', 'Join our New Year program and achieve your fitness goals with personalized training.'],
      createdAt: '2024-01-11T11:30:00Z',
      status: 'active',
      performance: {
        impressions: 12100,
        clicks: 987,
        ctr: 8.16
      }
    }
  ]

  const clients = Array.from(new Set(generationHistory.map(g => g.client)))

  const filteredHistory = generationHistory.filter(generation => {
    const matchesSearch = generation.headlines.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         generation.descriptions.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         generation.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         generation.campaign.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesPlatform = selectedPlatform === 'all' || generation.platform === selectedPlatform
    const matchesStatus = selectedStatus === 'all' || generation.status === selectedStatus
    const matchesClient = selectedClient === 'all' || generation.client === selectedClient

    return matchesSearch && matchesPlatform && matchesStatus && matchesClient
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleCopyContent = async (generation: Generation) => {
    const content = `Headlines:\n${generation.headlines.join('\n')}\n\nDescriptions:\n${generation.descriptions.join('\n')}`
    await navigator.clipboard.writeText(content)
    setCopiedId(generation.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const exportToCSV = () => {
    const csvContent = [
      ['Platform', 'Client', 'Campaign', 'Headlines', 'Descriptions', 'Status', 'Created', 'Impressions', 'Clicks', 'CTR'],
      ...filteredHistory.map(gen => [
        gen.platform,
        gen.client,
        gen.campaign,
        gen.headlines.join(' | '),
        gen.descriptions.join(' | '),
        gen.status,
        formatDate(gen.createdAt),
        gen.performance?.impressions || 0,
        gen.performance?.clicks || 0,
        gen.performance?.ctr || 0
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ad-generation-history.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'draft': return <Clock className="w-4 h-4 text-yellow-400" />
      case 'archived': return <Archive className="w-4 h-4 text-gray-400" />
      default: return null
    }
  }

  const getPlatformIcon = (platform: string) => {
    return platform === 'Google Ads' ? 
      <Chrome className="w-4 h-4 text-blue-400" /> : 
      <Facebook className="w-4 h-4 text-blue-500" />
  }

  return (
    <div className="min-h-screen bg-gray-950 font-['Plus_Jakarta_Sans']">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Generation History</h1>
          <p className="text-gray-400">View, search, and manage all your ad copy generations</p>
        </div>

        {/* Filters and Search */}
        <Card className="card-gradient mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Search */}
              <div className="lg:col-span-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search headlines, descriptions, campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Platform Filter */}
              <div className="lg:col-span-2">
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full py-2 px-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Platforms</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Facebook Ads">Facebook Ads</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="lg:col-span-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full py-2 px-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Client Filter */}
              <div className="lg:col-span-2">
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full py-2 px-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Clients</option>
                  {clients.map(client => (
                    <option key={client} value={client}>{client}</option>
                  ))}
                </select>
              </div>

              {/* Export Button */}
              <div className="lg:col-span-2">
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredHistory.length} of {generationHistory.length} generations
          </p>
        </div>

        {/* Generation History */}
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((generation) => (
              <Card key={generation.id} className="card-gradient hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {getPlatformIcon(generation.platform)}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-white truncate">{generation.campaign}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400 flex-wrap">
                          <span className="truncate">{generation.client}</span>
                          <span>•</span>
                          <span className="truncate">{generation.platform}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {getStatusIcon(generation.status)}
                            <span className="capitalize">{generation.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        onClick={() => handleCopyContent(generation)}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="w-3 h-3" />
                        {copiedId === generation.id ? 'Copied!' : 'Copy'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-3 h-3" />
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                    {/* Headlines */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Headlines</h4>
                      <div className="space-y-1">
                        {generation.headlines.map((headline, index) => (
                          <p key={index} className="text-white text-sm bg-gray-800/30 p-2 rounded">
                            {headline}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Descriptions</h4>
                      <div className="space-y-1">
                        {generation.descriptions.map((description, index) => (
                          <p key={index} className="text-white text-sm bg-gray-800/30 p-2 rounded">
                            {description}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {formatDate(generation.createdAt)}
                    </div>
                    
                    {generation.performance && (
                      <div className="flex items-center gap-6 text-xs">
                        <div className="text-gray-400">
                          <span className="font-medium text-white">{generation.performance.impressions.toLocaleString()}</span>
                          <span className="ml-1">impressions</span>
                        </div>
                        <div className="text-gray-400">
                          <span className="font-medium text-white">{generation.performance.clicks.toLocaleString()}</span>
                          <span className="ml-1">clicks</span>
                        </div>
                        <div className="text-gray-400">
                          <span className="font-medium text-green-400">{generation.performance.ctr}%</span>
                          <span className="ml-1">CTR</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="card-gradient">
              <CardContent className="flex flex-col items-center justify-center py-12 px-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No generations found</h3>
                <p className="text-gray-400 mb-6 text-center max-w-md">
                  {searchQuery || selectedPlatform !== 'all' || selectedStatus !== 'all' || selectedClient !== 'all'
                    ? 'No generations match your current filters. Try adjusting your search criteria.'
                    : 'You haven\'t created any ad generations yet. Start generating ads to see them here.'
                  }
                </p>
                <Button variant="primary" onClick={() => window.location.href = '/generate'}>
                  Create Your First Generation
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
} 