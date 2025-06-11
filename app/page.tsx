'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { CharacterCounter, GoogleAdsCounter } from '@/components/ui/CharacterCounter'
import { 
  Sparkles, 
  Zap, 
  Target, 
  BarChart3, 
  Users, 
  ArrowRight,
  Check,
  Copy,
  CheckCheck
} from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
  const [selectedExample, setSelectedExample] = useState('headlines')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const exampleHeadlines = [
    "Revolutionize Your Workflow",
    "AI-Powered Marketing Solutions",
    "Transform Ideas Into Results",
    "Next-Gen Business Tools",
    "Smart Automation Platform"
  ]

  const exampleDescriptions = [
    "Streamline your marketing campaigns with AI-powered insights and automated optimization tools.",
    "Generate compelling ad copy that converts, backed by data-driven recommendations.",
    "Scale your advertising efforts with intelligent content generation and performance tracking.",
    "Create professional campaigns in minutes, not hours, with our advanced AI assistance."
  ]

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000) // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 sm:pt-20 sm:pb-16 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gray-600 bg-gray-800/50 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-xs sm:text-sm text-gray-300">Powered by Advanced AI</span>
            </div>

            {/* Hero Title */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient-animated">Ad Studio</span>
                <br />
                <span className="text-white">by Cloud 9 Digital</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                Generate Google & Facebook ads that convert with AI-powered copywriting, 
                real-time compliance checking, and intelligent optimization.
              </p>
            </div>

            {/* Hero CTA */}
            <div className="flex justify-center mt-6 sm:mt-8 px-4 sm:px-0">
              <Link href="/auth/signup">
                <Button variant="primary" size="lg" className="group whitespace-nowrap">
                  <span className="flex items-center gap-2">
                    Start Creating Ads
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4 sm:py-16 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
              Everything you need for <span className="text-gradient">high-converting ads</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-xs sm:max-w-2xl mx-auto px-4 sm:px-0">
              From AI-powered content generation to Google Ads compliance, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* AI Generation */}
            <Card className="card-gradient group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">AI-Powered Generation</h3>
                <p className="text-gray-400">
                  Generate compelling headlines and descriptions that resonate with your target audience.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="text-sm font-medium text-blue-400 mb-1">Generated Headline</div>
                    <div className="text-white">"Transform Your Business Today"</div>
                    <div className="text-xs text-gray-500 mt-1">28 characters • Google Ads compliant</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Checking */}
            <Card className="card-gradient group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Google Ads Compliance</h3>
                <p className="text-gray-400">
                  Real-time validation ensures your ads meet Google's strict character limits and policies.
                </p>
              </CardHeader>
              <CardContent>
                <GoogleAdsCounter 
                  headlines={["Premium Business Solutions"]}
                  descriptions={["Get professional digital marketing services that drive real results for your business."]}
                />
              </CardContent>
            </Card>

            {/* Multi-Platform */}
            <Card className="card-gradient group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Multi-Platform Support</h3>
                <p className="text-gray-400">
                  Create optimized content for Google Ads, Facebook Ads, and other major platforms.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {/* Google Ads */}
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">Google Ads</span>
                  </div>
                  
                  {/* Facebook */}
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">Facebook</span>
                  </div>
                  
                  {/* Instagram */}
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">Instagram</span>
                  </div>
                  
                  {/* LinkedIn */}
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-800/50 border border-gray-700">
                    <div className="w-8 h-8 rounded-lg bg-[#0077B5] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-white">LinkedIn</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="card-gradient group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Performance Analytics</h3>
                <p className="text-gray-400">
                  Track which ad variations perform best and optimize for maximum ROI.
                </p>
              </CardHeader>
            </Card>

            {/* Client Management */}
            <Card className="card-gradient group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Client Management</h3>
                <p className="text-gray-400">
                  Organize campaigns by client with isolated data and custom branding options.
                </p>
              </CardHeader>
            </Card>

            {/* Speed & Efficiency */}
            <Card className="card-gradient group">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-400">
                  Generate complete ad campaigns in seconds, not hours. Save time and focus on strategy.
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-12 px-4 sm:py-16 sm:px-6 bg-gradient-to-b from-gray-900/50 to-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
              See <span className="text-gradient">Ad Studio</span> in action
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 px-4 sm:px-0">
              Try our AI-powered ad generation with real-time compliance checking
            </p>
          </div>

          <Card className="card-glass">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <h3 className="text-lg sm:text-xl font-semibold">Live Demo</h3>
                <div className="flex gap-2 w-full sm:w-auto">
                  {['headlines', 'descriptions'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedExample(type)}
                      className={`flex-1 sm:flex-none px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                        selectedExample === type
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedExample === 'headlines' ? (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-300">Generated Headlines (15 max)</h4>
                    <div className="grid gap-3">
                      {exampleHeadlines.map((headline, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700 group hover:bg-gray-700/50 transition-colors">
                          <span className="text-white flex-1">{headline}</span>
                          <div className="flex items-center gap-2">
                            <CharacterCounter text={headline} maxLength={30} />
                            <button
                              onClick={() => copyToClipboard(headline, index)}
                              className="p-1 rounded-md hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                              title="Copy to clipboard"
                            >
                              {copiedIndex === index ? (
                                <CheckCheck className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-300">Generated Descriptions (4 max)</h4>
                    <div className="grid gap-3">
                      {exampleDescriptions.map((description, index) => (
                        <div key={index} className="p-3 rounded-lg bg-gray-800/50 border border-gray-700 group hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="text-white mb-2 flex-1">{description}</div>
                            <button
                              onClick={() => copyToClipboard(description, index + 100)} // Offset index to avoid conflicts
                              className="p-1 rounded-md hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100 ml-2"
                              title="Copy to clipboard"
                            >
                              {copiedIndex === index + 100 ? (
                                <CheckCheck className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                          <CharacterCounter text={description} maxLength={90} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/auth/signup">
                <Button variant="primary" className="w-full whitespace-nowrap">
                  <span className="flex items-center gap-2 justify-center">
                    Generate New Variations
                  </span>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>



      {/* Internal Tool CTA */}
      <section className="py-16 px-4 sm:py-20 sm:px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Ready to <span className="text-gradient">streamline</span> your ad creation process?
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 max-w-xs sm:max-w-2xl mx-auto px-4 sm:px-0">
            Internal tool designed for Cloud 9 Digital team to create high-converting ad campaigns efficiently.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <Link href="/auth/signin">
              <Button variant="primary" size="lg" className="group whitespace-nowrap">
                <span className="flex items-center gap-2">
                  Access Dashboard
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 px-4">
            Internal use only • Cloud 9 Digital team access
          </p>
        </div>
      </section>
    </div>
  )
} 