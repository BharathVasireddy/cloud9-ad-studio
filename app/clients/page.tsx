'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import Header from '../../components/layout/Header'
import { 
  Search, 
  Plus, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  BarChart3,
  Calendar,
  Edit,
  Trash2,
  ExternalLink,
  Users,
  TrendingUp
} from 'lucide-react'

interface Client {
  id: number
  name: string
  email: string
  phone?: string
  website?: string
  industry: string
  createdAt: string
  totalCampaigns: number
  activeCampaigns: number
  totalSpend: number
  avgCTR: number
  status: 'active' | 'inactive' | 'pending'
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [showAddClient, setShowAddClient] = useState(false)

  // Mock client data
  const clients: Client[] = [
    {
      id: 1,
      name: 'Tech Startup Inc.',
      email: 'contact@techstartup.com',
      phone: '+1 (555) 123-4567',
      website: 'https://techstartup.com',
      industry: 'Technology',
      createdAt: '2024-01-10T09:00:00Z',
      totalCampaigns: 8,
      activeCampaigns: 3,
      totalSpend: 15420,
      avgCTR: 5.78,
      status: 'active'
    },
    {
      id: 2,
      name: 'E-commerce Store',
      email: 'marketing@ecomstore.com',
      phone: '+1 (555) 987-6543',
      website: 'https://ecomstore.com',
      industry: 'E-commerce',
      createdAt: '2024-01-08T14:30:00Z',
      totalCampaigns: 12,
      activeCampaigns: 5,
      totalSpend: 28930,
      avgCTR: 4.92,
      status: 'active'
    },
    {
      id: 3,
      name: 'Local Restaurant',
      email: 'info@localrestaurant.com',
      phone: '+1 (555) 456-7890',
      industry: 'Food & Beverage',
      createdAt: '2024-01-05T11:15:00Z',
      totalCampaigns: 4,
      activeCampaigns: 2,
      totalSpend: 3240,
      avgCTR: 7.22,
      status: 'active'
    },
    {
      id: 4,
      name: 'Fitness Studio Pro',
      email: 'contact@fitnesspro.com',
      phone: '+1 (555) 321-9876',
      website: 'https://fitnesspro.com',
      industry: 'Health & Fitness',
      createdAt: '2024-01-03T16:45:00Z',
      totalCampaigns: 6,
      activeCampaigns: 1,
      totalSpend: 12100,
      avgCTR: 8.16,
      status: 'active'
    },
    {
      id: 5,
      name: 'Design Agency Co.',
      email: 'hello@designagency.co',
      industry: 'Design & Creative',
      createdAt: '2023-12-28T10:20:00Z',
      totalCampaigns: 2,
      activeCampaigns: 0,
      totalSpend: 850,
      avgCTR: 3.45,
      status: 'inactive'
    }
  ]

  const industries = [...new Set(clients.map(c => c.industry))]

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.industry.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesIndustry = selectedIndustry === 'all' || client.industry === selectedIndustry
    const matchesStatus = selectedStatus === 'all' || client.status === selectedStatus

    return matchesSearch && matchesIndustry && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'inactive': return 'bg-gray-500/20 text-gray-400'
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const totalStats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'active').length,
    totalSpend: clients.reduce((sum, c) => sum + c.totalSpend, 0),
    avgCTR: clients.reduce((sum, c) => sum + c.avgCTR, 0) / clients.length
  }

  return (
    <div className="min-h-screen bg-gray-950 font-['Plus_Jakarta_Sans']">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Client Management</h1>
            <p className="text-gray-400">Organize and manage your advertising clients</p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => setShowAddClient(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Clients</p>
                  <p className="text-2xl font-bold text-white">{totalStats.totalClients}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Clients</p>
                  <p className="text-2xl font-bold text-white">{totalStats.activeClients}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Ad Spend</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(totalStats.totalSpend)}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg CTR</p>
                  <p className="text-2xl font-bold text-white">{totalStats.avgCTR.toFixed(2)}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="card-gradient mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Search */}
              <div className="lg:col-span-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search clients by name, email, or industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Industry Filter */}
              <div className="lg:col-span-3">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full py-2 px-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="lg:col-span-3">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full py-2 px-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredClients.length} of {clients.length} clients
          </p>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <Card key={client.id} className="card-gradient hover:border-gray-600 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span>{client.email}</span>
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Phone className="w-4 h-4" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    {client.website && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Globe className="w-4 h-4" />
                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                          {client.website.replace('https://', '')}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Building2 className="w-4 h-4" />
                      <span>{client.industry}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-800">
                    <div>
                      <p className="text-xs text-gray-400">Total Campaigns</p>
                      <p className="text-lg font-semibold text-white">{client.totalCampaigns}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Active Campaigns</p>
                      <p className="text-lg font-semibold text-green-400">{client.activeCampaigns}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Spend</p>
                      <p className="text-lg font-semibold text-white">{formatCurrency(client.totalSpend)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Avg CTR</p>
                      <p className="text-lg font-semibold text-cyan-400">{client.avgCTR}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>Added {formatDate(client.createdAt)}</span>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <ExternalLink className="w-3 h-3" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card className="card-gradient">
                <CardContent className="flex flex-col items-center justify-center py-12 px-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
                    <Users className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No clients found</h3>
                  <p className="text-gray-400 mb-6 text-center max-w-md">
                    {searchQuery || selectedIndustry !== 'all' || selectedStatus !== 'all'
                      ? 'No clients match your current filters. Try adjusting your search criteria.'
                      : 'You haven\'t added any clients yet. Add your first client to get started.'
                    }
                  </p>
                  <Button variant="primary" onClick={() => setShowAddClient(true)}>
                    Add Your First Client
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 