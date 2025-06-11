'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import Header from '../../components/layout/Header'
import { useClient } from '../../contexts/ClientContext'
import { Chrome, Facebook, Sparkles, Copy, CheckCircle, AlertTriangle, Users, Package } from 'lucide-react'
import { Client, Service } from '../../types/client'

interface GenerationRequest {
  platform: 'google' | 'facebook'
  clientId: string
  serviceId: string
}

interface GenerationResponse {
  headlines: string[]
  descriptions: string[]
  confidence: number
  warnings: string[]
}

export default function GeneratePage() {
  const { clients } = useClient()
  const [request, setRequest] = useState<GenerationRequest>({
    platform: 'google',
    clientId: '',
    serviceId: ''
  })
  const [results, setResults] = useState<GenerationResponse | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const selectedClient = clients.find(c => c.id === request.clientId)
  const selectedService = selectedClient?.services.find(s => s.id === request.serviceId)

  const handleGenerate = async () => {
    if (!request.clientId || !request.serviceId) return

    setIsGenerating(true)
    setError(null)
    setResults(null)

    try {
      const endpoint = `/api/generate/${request.platform}`
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: request.clientId,
          serviceId: request.serviceId
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate ads')
      }

      const result = await response.json()
      setResults(result)
    } catch (err: any) {
      setError(err.message || 'Failed to generate ads')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const isFormValid = request.clientId && request.serviceId

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Ad Generator</h1>
          <p className="text-gray-400">Generate optimized ad copy using proven frameworks (AIDA, PAS, Hook-Benefit-Proof)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <h2 className="text-lg font-semibold text-white">Configuration</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Platform Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Platform
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setRequest(prev => ({ ...prev, platform: 'google' }))}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        request.platform === 'google'
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Chrome className="w-4 h-4 mx-auto mb-1" />
                      Google
                    </button>
                    <button
                      onClick={() => setRequest(prev => ({ ...prev, platform: 'facebook' }))}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        request.platform === 'facebook'
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Facebook className="w-4 h-4 mx-auto mb-1" />
                      Facebook
                    </button>
                  </div>
                </div>

                {/* Client Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Client
                  </label>
                  <select
                    value={request.clientId}
                    onChange={(e) => setRequest(prev => ({ 
                      ...prev, 
                      clientId: e.target.value,
                      serviceId: '' // Reset service when client changes
                    }))}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a client...</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.businessName} {client.city ? `• ${client.city}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Selection */}
                {selectedClient && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Package className="w-4 h-4 inline mr-1" />
                      Service
                    </label>
                    <select
                      value={request.serviceId}
                      onChange={(e) => setRequest(prev => ({ ...prev, serviceId: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a service...</option>
                      {selectedClient.services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} ({service.category})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Selected Info */}
                {selectedClient && selectedService && (
                  <div className="bg-gray-800/50 rounded-lg p-3 text-sm">
                    <div className="text-blue-400 font-medium mb-1">Selected:</div>
                    <div className="text-gray-300">{selectedClient.businessName}</div>
                    <div className="text-gray-400">{selectedService.name}</div>
                    {selectedClient.city && (
                      <div className="text-gray-500">{selectedClient.city}</div>
                    )}
                  </div>
                )}

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!isFormValid || isGenerating}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  {isGenerating ? (
                                      <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Ad Copy
                  </>
                )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {error && (
              <Card className="bg-red-900/20 border-red-500/50 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {isGenerating && (
              <div className="space-y-6">
                {/* Loading Skeleton for Headlines */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="h-5 bg-gray-700 rounded w-32 animate-pulse"></div>
                      <div className="h-4 bg-gray-700 rounded w-8 animate-pulse"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {[...Array(15)].map((_, index) => (
                        <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 pr-4">
                              <div className={`h-4 bg-gray-700 rounded animate-pulse mb-1`} 
                                   style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                              <div className="h-3 bg-gray-700 rounded w-16 animate-pulse"></div>
                            </div>
                            <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Loading Skeleton for Descriptions */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="h-5 bg-gray-700 rounded w-36 animate-pulse"></div>
                      <div className="h-4 bg-gray-700 rounded w-6 animate-pulse"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 pr-4">
                              <div className="h-4 bg-gray-700 rounded animate-pulse mb-1 w-full"></div>
                              <div className="h-4 bg-gray-700 rounded animate-pulse mb-1" 
                                   style={{ width: `${Math.random() * 30 + 70}%` }}></div>
                              <div className="h-3 bg-gray-700 rounded w-20 animate-pulse"></div>
                            </div>
                            <div className="w-4 h-4 bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {results && !isGenerating && (
              <div className="space-y-6">
                {/* Headlines */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-white">
                      Headlines ({results.headlines.length})
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {results.headlines.map((headline, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800/70 transition-colors group"
                        >
                          <div className="flex-1 pr-4">
                            <span className="text-white text-sm">{headline}</span>
                            <span className="text-gray-400 text-xs ml-2">
                              ({headline.length} chars)
                            </span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(headline)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-700 rounded"
                          >
                            {copiedText === headline ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Descriptions */}
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-white">
                      Descriptions ({results.descriptions.length})
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {results.descriptions.map((description, index) => (
                        <div
                          key={index}
                          className="flex items-start justify-between bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800/70 transition-colors group"
                        >
                          <div className="flex-1 pr-4">
                            <span className="text-white text-sm">{description}</span>
                            <span className="text-gray-400 text-xs ml-2">
                              ({description.length} chars)
                            </span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(description)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-700 rounded flex-shrink-0"
                          >
                            {copiedText === description ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Warnings */}
                {results.warnings && results.warnings.length > 0 && (
                  <Card className="bg-yellow-900/20 border-yellow-500/50">
                    <CardHeader>
                      <h3 className="text-lg font-semibold text-yellow-400">Warnings</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {results.warnings.map((warning, index) => (
                          <li key={index} className="text-yellow-300 text-sm">
                            • {warning}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {!results && !error && !isGenerating && (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-8 text-center">
                  <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">Ready to Generate</h3>
                  <p className="text-gray-500">Select a client and service to create compelling ad copy</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 