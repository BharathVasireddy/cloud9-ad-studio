'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import Header from '../../components/layout/Header'
import { Chrome, Facebook, Sparkles } from 'lucide-react'

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-gray-950 font-['Plus_Jakarta_Sans']">
      <Header
        title="Generate Ad Copy"
        subtitle="Select the advertising platform to generate optimized ad copy"
        showBackButton={true}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Platform
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select the advertising platform to generate optimized ad copy that meets specific character limits and compliance requirements
          </p>
        </div>

        {/* Platform Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Google Ads */}
          <Card className="card-gradient hover-lift cursor-pointer group transition-all duration-300">
            <Link href="/generate/google" className="block h-full">
              <CardHeader className="p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Chrome className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Google Ads</h3>
                <p className="text-gray-400 leading-relaxed">
                  Generate search and display ad copy optimized for Google's advertising platform with strict compliance rules
                </p>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Headlines: Max 30 characters each</li>
                    <li>• Descriptions: Max 90 characters each</li>
                    <li>• No exclamation marks allowed</li>
                    <li>• Compliant with Google policies</li>
                  </ul>
                </div>
                <Button variant="primary" className="w-full group-hover:bg-blue-500 transition-colors">
                  Generate Google Ads
                </Button>
              </CardContent>
            </Link>
          </Card>

          {/* Facebook Ads */}
          <Card className="card-gradient hover-lift cursor-pointer group transition-all duration-300">
            <Link href="/generate/facebook" className="block h-full">
              <CardHeader className="p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Facebook className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Facebook Ads</h3>
                <p className="text-gray-400 leading-relaxed">
                  Create engaging social media ad copy for Facebook and Instagram with emotional appeal and conversational tone
                </p>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Features:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Headlines: Max 255 characters</li>
                    <li>• Descriptions: Max 2200 characters</li>
                    <li>• Emojis and social proof allowed</li>
                    <li>• Multiple campaign objectives</li>
                  </ul>
                </div>
                <Button variant="primary" className="w-full group-hover:bg-indigo-500 transition-colors">
                  Generate Facebook Ads
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-white mb-6">AI-Powered Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Smart Compliance</h4>
              <p className="text-gray-400 text-sm">Automatically ensures all generated copy meets platform-specific requirements</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Multiple Variations</h4>
              <p className="text-gray-400 text-sm">Generate multiple headlines and descriptions to test and optimize performance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Export Ready</h4>
              <p className="text-gray-400 text-sm">Copy-to-clipboard and CSV export for easy import into ad platforms</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 