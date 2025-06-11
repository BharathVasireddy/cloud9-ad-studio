'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner'
import Header from '../../../components/layout/Header'
import { Facebook, Sparkles, Copy, RefreshCw, AlertTriangle } from 'lucide-react'
import { FacebookAdsGenerationRequest, FacebookAdsGenerationResponse } from '../../../lib/openai'

export default function FacebookAdsGeneratePage() {
  const [formData, setFormData] = useState<FacebookAdsGenerationRequest>({
    businessName: '',
    businessDescription: '',
    targetAudience: '',
    objective: 'awareness',
    keyFeatures: [],
    callToAction: '',
    tone: 'professional'
  })

  const [generatedAds, setGeneratedAds] = useState<FacebookAdsGenerationResponse | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [keyFeatureInput, setKeyFeatureInput] = useState('')

  const handleInputChange = (field: keyof FacebookAdsGenerationRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addKeyFeature = () => {
    if (keyFeatureInput.trim() && formData.keyFeatures.length < 5) {
      setFormData(prev => ({
        ...prev,
        keyFeatures: [...prev.keyFeatures, keyFeatureInput.trim()]
      }))
      setKeyFeatureInput('')
    }
  }

  const removeKeyFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }))
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/generate/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate ads')
      }

      const result = await response.json()
      setGeneratedAds(result)
    } catch (err: any) {
      setError(err.message || 'Failed to generate ads')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const exportToCSV = () => {
    if (!generatedAds) return

    const csvData = [
      ['Type', 'Content', 'Character Count'],
      ...generatedAds.headlines.map((h, i) => [`Headline ${i + 1}`, h, h.length.toString()]),
      ...generatedAds.descriptions.map((d, i) => [`Description ${i + 1}`, d, d.length.toString()])
    ]

    const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `facebook-ads-${formData.businessName.replace(/\s+/g, '-').toLowerCase()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const isFormValid = () => {
    return (
      formData.businessName.trim() &&
      formData.businessDescription.trim() &&
      formData.targetAudience.trim() &&
      formData.keyFeatures.length > 0 &&
      formData.callToAction.trim()
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 font-['Plus_Jakarta_Sans']">
      <Header
        showBackButton={true}
        backButtonHref="/generate"
        backButtonText="Back"
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="card-gradient">
              <CardHeader>
                <h2 className="text-2xl font-bold text-white mb-2">Campaign Details</h2>
                <p className="text-gray-400">Create engaging Facebook and Instagram ads</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Name *
                  </label>
                  <Input
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Enter your business name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Description *
                  </label>
                  <textarea
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                    placeholder="Describe what your business does and what makes it unique"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Audience *
                  </label>
                  <Input
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    placeholder="e.g., Young professionals interested in fitness and wellness"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Campaign Objective *
                  </label>
                  <select
                    value={formData.objective}
                    onChange={(e) => handleInputChange('objective', e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="awareness">Brand Awareness</option>
                    <option value="traffic">Website Traffic</option>
                    <option value="engagement">Engagement</option>
                    <option value="leads">Lead Generation</option>
                    <option value="sales">Sales/Conversions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Key Features * (Max 5)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={keyFeatureInput}
                      onChange={(e) => setKeyFeatureInput(e.target.value)}
                      placeholder="Add a key feature or benefit"
                      className="flex-1"
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyFeature())}
                    />
                    <Button
                      type="button"
                      onClick={addKeyFeature}
                      disabled={!keyFeatureInput.trim() || formData.keyFeatures.length >= 5}
                      variant="outline"
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.keyFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {feature}
                        <button
                          onClick={() => removeKeyFeature(index)}
                          className="text-indigo-300 hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Call to Action *
                  </label>
                  <Input
                    value={formData.callToAction}
                    onChange={(e) => handleInputChange('callToAction', e.target.value)}
                    placeholder="e.g., Shop Now, Learn More, Sign Up Today"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tone
                  </label>
                  <select
                    value={formData.tone}
                    onChange={(e) => handleInputChange('tone', e.target.value as any)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="friendly">Friendly</option>
                    <option value="authoritative">Authoritative</option>
                    <option value="playful">Playful</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleGenerate}
              disabled={!isFormValid() || isGenerating}
              className="w-full py-4 text-lg font-semibold"
              variant="primary"
            >
              {isGenerating ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Generating Ads...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Facebook Ads
                </>
              )}
            </Button>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-400 font-medium">Generation Failed</h4>
                  <p className="text-red-300 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {generatedAds ? (
              <>
                <Card className="card-gradient">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Generated Headlines</h3>
                      <p className="text-gray-400 text-sm">Max 255 characters each</p>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(generatedAds.headlines.join('\n'))}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy All
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {generatedAds.headlines.map((headline, index) => (
                      <div key={index} className="group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-400">
                            Headline {index + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-blue-400">
                              {headline.length}/255
                            </span>
                            <Button
                              onClick={() => copyToClipboard(headline)}
                              variant="outline"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                          <p className="text-white text-sm">{headline}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Generated Descriptions</h3>
                      <p className="text-gray-400 text-sm">Max 2200 characters each</p>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(generatedAds.descriptions.join('\n'))}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy All
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {generatedAds.descriptions.map((description, index) => (
                      <div key={index} className="group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-400">
                            Description {index + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-blue-400">
                              {description.length}/2200
                            </span>
                            <Button
                              onClick={() => copyToClipboard(description)}
                              variant="outline"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                          <p className="text-white text-sm">{description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {generatedAds.warnings.length > 0 && (
                  <Card className="border-yellow-500/20 bg-yellow-500/5">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        <h3 className="text-lg font-semibold text-yellow-400">Suggestions</h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {generatedAds.warnings.map((warning, index) => (
                          <li key={index} className="text-yellow-300 text-sm flex items-start gap-2">
                            <span className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    variant="outline"
                    className="flex-1"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={exportToCSV}
                    variant="primary"
                    className="flex-1"
                  >
                    Export CSV
                  </Button>
                </div>
              </>
            ) : (
              <Card className="card-gradient">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
                    <Facebook className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Ready to Generate</h3>
                  <p className="text-gray-400 text-sm">
                    Fill out the form and click "Generate Facebook Ads" to create your ad copy
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 