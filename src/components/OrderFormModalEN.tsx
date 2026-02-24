'use client'

import { useState } from 'react'

interface OrderFormData {
  // Project Information
  projectName: string
  projectDescription: string
  projectType: string
  deadline: string
  
  // Brand Information
  companyName: string
  industry: string
  targetAudience: string
  competitors: string
  
  // Design Preferences
  designStyle: string
  colorPreferences: string
  inspirationLinks: string
  
  // Contact Information
  contactName: string
  email: string
  phone: string
  wechat: string
  
  // Plan Selection
  selectedPlan: 'basic' | 'professional' | 'premium'
}

interface OrderFormModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: 'basic' | 'professional' | 'premium'
  onSubmit: (formData: OrderFormData) => Promise<void>
}

export default function OrderFormModal({ isOpen, onClose, selectedPlan, onSubmit }: OrderFormModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState<OrderFormData>({
    projectName: '',
    projectDescription: '',
    projectType: '',
    deadline: '',
    companyName: '',
    industry: '',
    targetAudience: '',
    competitors: '',
    designStyle: '',
    colorPreferences: '',
    inspirationLinks: '',
    contactName: '',
    email: '',
    phone: '',
    wechat: '',
    selectedPlan
  })

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Submission failed, please try again')
    } finally {
      setLoading(false)
    }
  }

  const planPrices = {
    basic: '$299',
    professional: '$599',
    premium: '$999'
  }

  const planNames = {
    basic: 'Basic Plan',
    professional: 'Professional Plan',
    premium: 'Premium Plan'
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Design Requirements Form</h2>
                <p className="text-gray-600 mt-1">
                  Selected Plan: <span className="font-bold text-blue-600">{planNames[selectedPlan]} ({planPrices[selectedPlan]})</span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Step Indicator */}
            <div className="mt-6">
              <div className="flex justify-between">
                {[1, 2, 3, 4].map(step => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {step}
                    </div>
                    <div className="mt-2 text-sm">
                      {step === 1 && 'Project Info'}
                      {step === 2 && 'Brand Info'}
                      {step === 3 && 'Design Preferences'}
                      {step === 4 && 'Contact Info'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep - 1) * 33.33}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 overflow-y-auto max-h-[60vh]">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Project Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., Brand Logo Design"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  >
                    <option value="">Select Project Type</option>
                    <option value="logo-design">Logo Design</option>
                    <option value="brand-identity">Brand Identity</option>
                    <option value="packaging-design">Packaging Design</option>
                    <option value="website-design">Website Design</option>
                    <option value="ui-ux-design">UI/UX Design</option>
                    <option value="print-design">Print Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Please describe your design requirements, goals, and expectations in detail..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Completion Time
                  </label>
                  <input
                    type="text"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., Within 2 weeks, Within 1 month"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Brand Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Brand Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Your company or brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., Technology, Food & Beverage, Education, Fashion"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <textarea
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Describe your target customer group (age, gender, interests, etc.)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Competitors/Reference Brands
                  </label>
                  <textarea
                    name="competitors"
                    value={formData.competitors}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="List your competitors or brands you admire"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Design Preferences</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Design Style
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Modern Minimalist', 'Classic Traditional', 'Creative Energetic', 'Luxury Premium', 'Tech Futuristic', 'Natural Organic', 'Vintage Retro', 'Other'].map(style => (
                      <label key={style} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="designStyle"
                          value={style}
                          checked={formData.designStyle === style}
                          onChange={handleInputChange}
                          className="text-blue-600"
                        />
                        <span>{style}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color Preferences
                  </label>
                  <input
                    type="text"
                    name="colorPreferences"
                    value={formData.colorPreferences}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., Blue tones, Warm colors, Black & white minimalist"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inspiration Links/Reference Images
                  </label>
                  <textarea
                    name="inspirationLinks"
                    value={formData.inspirationLinks}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="You can paste Pinterest, Behance links or describe styles you like"
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="For receiving design files and communication"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="For urgent contact"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WeChat/WhatsApp
                    </label>
                    <input
                      type="text"
                      name="wechat"
                      value={formData.wechat}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="For daily communication"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-bold text-blue-900 mb-2">Order Summary</h4>
                  <div className="space-y-2 text-blue-800">
                    <div className="flex justify-between">
                      <span>Plan:</span>
                      <span className="font-bold">{planNames[selectedPlan]} ({planPrices[selectedPlan]})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Project:</span>
                      <span>{formData.projectName || 'Not specified'}</span>
                    </div>
                    <div className="text-sm text-blue-600 mt-4">
                      * We will contact you shortly to confirm the details after submission
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6">
            <div className="flex justify-between">
              <div>
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                )}
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                
                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !formData.projectName || !formData.projectType || !formData.projectDescription || !formData.contactName}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : `Submit & Pay ${planPrices[selectedPlan]}`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}