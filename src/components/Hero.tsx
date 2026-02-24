'use client'

import { useState } from 'react'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleConsultation = () => {
    if (!email) {
      alert('Please enter your email to book a consultation')
      return
    }
    window.open(`https://calendly.com/wedesign/consultation?email=${encodeURIComponent(email)}`, '_blank')
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Logo Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-8">
            <span className="text-white text-2xl font-bold">W</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional <span className="text-blue-600">Design</span> Services
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Transform your brand with expert logo design, brand identity, and visual storytelling.
            <span className="block text-lg text-gray-500 mt-2">
              Used by 500+ startups and established businesses worldwide.
            </span>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">24h</div>
              <div className="text-gray-600">Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">$1M+</div>
              <div className="text-gray-600">Revenue</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Start with a free consultation
              </label>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={handleConsultation}
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-r-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? 'Booking...' : 'Book Free Call'}
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                No commitment. 30-minute strategy session.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="text-gray-500 text-sm">Trusted by:</div>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-xs">YC</span>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-xs">TC</span>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-xs">FB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}