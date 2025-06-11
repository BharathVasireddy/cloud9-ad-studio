'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { CreateClientData, UpdateClientData } from '@/types/client';
import { 
  X, 
  Plus, 
  Trash2, 
  Building2, 
  Mail, 
  Globe, 
  Package
} from 'lucide-react';

interface ClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateClientData) => Promise<void>;
  initialData?: UpdateClientData;
  isEditing?: boolean;
}

const serviceCategories = [
  { value: 'product', label: 'Product' },
  { value: 'service', label: 'Service' },
  { value: 'digital', label: 'Digital' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' }
];

export default function ClientForm({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialData, 
  isEditing = false 
}: ClientFormProps) {
  const [loading, setLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState<CreateClientData>({
    businessName: '',
    contactEmail: '',
    city: '',
    industry: '',
    website: '',
    description: '',
    services: []
  });

  // Current service being added
  const [currentService, setCurrentService] = useState({
    name: '',
    description: '',
    category: 'service' as const,
    url: ''
  });

  // Load initial data if editing
  useEffect(() => {
    if (initialData && isEditing) {
      setFormData({
        businessName: initialData.businessName || '',
        contactEmail: initialData.contactEmail || '',
        city: initialData.city || '',
        industry: initialData.industry || '',
        website: initialData.website || '',
        description: initialData.description || '',
        services: initialData.services || []
      });
    } else {
      // Reset form for new client
      setFormData({
        businessName: '',
        contactEmail: '',
        city: '',
        industry: '',
        website: '',
        description: '',
        services: []
      });
    }
  }, [initialData, isEditing, isOpen]);

  const handleInputChange = (field: keyof CreateClientData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addService = () => {
    if (currentService.name && currentService.description) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, currentService]
      }));
      
      // Reset current service
      setCurrentService({
        name: '',
        description: '',
        category: 'service',
        url: ''
      });
    }
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = formData.businessName && formData.services.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg border border-gray-800 w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isEditing ? 'Edit Client' : 'Add New Client'}
            </h2>
            <p className="text-gray-400 mt-1">
              Enter client information and services
            </p>
          </div>
          <Button
            onClick={onClose}
            variant="secondary"
            size="sm"
            className="bg-gray-800 hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Business Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter business name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="contact@business.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., New York, London, Tokyo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Technology, Healthcare, Retail"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://business.com"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the business..."
                />
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Services *</h3>
              
              {/* Existing Services */}
              {formData.services.length > 0 && (
                <div className="mb-6">
                  <div className="space-y-3">
                    {formData.services.map((service, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-4 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Package className="w-4 h-4 text-blue-400" />
                            <h4 className="font-medium text-white">{service.name}</h4>
                            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                              {serviceCategories.find(cat => cat.value === service.category)?.label}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{service.description}</p>
                          {service.url && (
                            <div className="flex items-center gap-2 text-xs">
                              <Globe className="w-3 h-3 text-gray-500" />
                              <a 
                                href={service.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-400 hover:text-blue-300 underline"
                              >
                                {service.url}
                              </a>
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={() => removeService(index)}
                          variant="secondary"
                          size="sm"
                          className="bg-red-900/50 hover:bg-red-900 text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Service */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-4">Add Service</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Service Name
                    </label>
                    <input
                      type="text"
                      value={currentService.name}
                      onChange={(e) => setCurrentService(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Web Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={currentService.category}
                      onChange={(e) => setCurrentService(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {serviceCategories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={currentService.description}
                    onChange={(e) => setCurrentService(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What does this service offer?"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Service URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      value={currentService.url}
                      onChange={(e) => setCurrentService(prev => ({ ...prev, url: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/service"
                    />
                  </div>
                </div>

                <Button
                  onClick={addService}
                  disabled={!currentService.name || !currentService.description}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-800">
          <div className="text-sm text-gray-400">
            * Required fields
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="secondary"
              className="bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Client' : 'Create Client'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 