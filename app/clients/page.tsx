'use client'

import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'
import Header from '../../components/layout/Header'
import ClientForm from '../../components/forms/ClientForm'
import { useClient } from '../../contexts/ClientContext'
import { useAuth } from '../../contexts/AuthContext'
import { CreateClientData, UpdateClientData } from '../../types/client'
import { 
  Search, 
  Plus, 
  Globe, 
  MapPin,
  Package,
  Loader2,
  Edit,
  Trash2
} from 'lucide-react'

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState<string | null>(null)
  
  const { 
    clients, 
    loading, 
    error, 
    createClient, 
    updateClient, 
    deleteClient
  } = useClient()
  
  const { user } = useAuth()

  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    client.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.website?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const extractDomain = (url?: string) => {
    if (!url) return null
    try {
      return new URL(url.startsWith('http') ? url : `https://${url}`).hostname
    } catch {
      return url
    }
  }

  const handleCreateClient = async (data: CreateClientData) => {
    try {
      await createClient(data)
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create client:', error)
    }
  }

  const handleUpdateClient = async (data: UpdateClientData) => {
    if (!editingClient) return
    
    try {
      await updateClient(editingClient, data)
      setEditingClient(null)
      setShowForm(false)
    } catch (error) {
      console.error('Failed to update client:', error)
    }
  }

  const getEditingClientData = () => {
    if (!editingClient) return undefined
    return clients.find(client => client.id === editingClient)
  }

  const handleDeleteClient = async (clientId: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return
    
    try {
      await deleteClient(clientId)
    } catch (error) {
      console.error('Failed to delete client:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to manage clients</h1>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin mr-3" />
            <span>Loading clients...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header with Search */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Client Management</h1>
            <p className="text-gray-400">Manage your clients and their services</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            
            <Button
              onClick={() => {
                setEditingClient(null)
                setShowForm(true)
              }}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-400">Error: {error}</p>
          </div>
        )}

        {/* Clients Grid */}
        {filteredClients.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <Package className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {searchTerm ? 'No clients found' : 'No clients yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Add your first client to get started'
              }
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Client
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors duration-200 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-white truncate mb-1">
                      {client.businessName}
                    </h3>
                    {client.industry && (
                      <p className="text-sm text-gray-400">
                        {client.industry}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <Button
                      onClick={() => {
                        setEditingClient(client.id)
                        setShowForm(true)
                      }}
                      variant="secondary"
                      size="sm"
                      className="bg-gray-800 hover:bg-gray-700 border-gray-700 p-1.5"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteClient(client.id)}
                      variant="secondary"
                      size="sm"
                      className="bg-gray-800 hover:bg-red-600 border-gray-700 p-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {/* City */}
                  {client.city && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{client.city}</span>
                    </div>
                  )}

                  {/* Website */}
                  {client.website && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a
                        href={client.website.startsWith('http') ? client.website : `https://${client.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300 truncate"
                      >
                        {extractDomain(client.website)}
                      </a>
                    </div>
                  )}

                  {/* Services */}
                  <div className="flex items-center gap-2 text-gray-300">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      {client.services.length} service{client.services.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Client Form Modal */}
        <ClientForm
          isOpen={showForm}
          onClose={() => {
            setShowForm(false)
            setEditingClient(null)
          }}
          onSubmit={editingClient ? handleUpdateClient : handleCreateClient}
          initialData={getEditingClientData()}
          isEditing={!!editingClient}
        />
      </div>
    </div>
  )
} 