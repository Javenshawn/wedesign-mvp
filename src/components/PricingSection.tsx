'use client'

import { useState } from 'react'

export default function PricingSection() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleBuy = async (plan: 'basic' | 'professional' | 'premium') => {
    if (!email) {
      alert('Please enter your email')
      return
    }

    const priceMap = {
      basic: 'price_1T4EQICY5vZ28ogKIt1fBRwd', // $299
      professional: 'price_1T4ERcCY5vZ28ogKeAmpEtdq', // $599
      premium: 'price_1T4ESpCY5vZ28ogKit9ENo2g' // $999
    }

    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceMap[plan],
          email: email
        })
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Checkout failed: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include source files and commercial rights.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Basic Package */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
              <div className="text-5xl font-bold text-blue-600 mb-4">$299</div>
              <p className="text-gray-600">Perfect for startups</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>1 Logo Concept</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>2 Revisions</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>3-Day Delivery</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Source Files (AI, PDF, PNG)</span>
              </div>
            </div>
            <button
              onClick={() => handleBuy('basic')}
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Get Basic - $299'}
            </button>
          </div>

          {/* Professional Package */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-blue-500 relative transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</span>
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <div className="text-5xl font-bold text-blue-600 mb-4">$599</div>
              <p className="text-gray-600">Best for growing businesses</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>3 Logo Concepts</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Unlimited Revisions</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>2-Day Delivery</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Brand Guidelines</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Social Media Kit</span>
              </div>
            </div>
            <button
              onClick={() => handleBuy('professional')}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Get Professional - $599'}
            </button>
          </div>

          {/* Premium Package */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <div className="text-5xl font-bold text-blue-600 mb-4">$999</div>
              <p className="text-gray-600">Complete brand solution</p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>5 Logo Concepts</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Unlimited Revisions</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>24-Hour Delivery</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Full Brand System</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Website Mockups</span>
              </div>
            </div>
            <button
              onClick={() => handleBuy('premium')}
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Get Premium - $999'}
            </button>
          </div>
        </div>

        {/* Email Input Section */}
        <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Get Started?</h3>
            <p className="text-gray-600">
              Enter your email below. We'll send order confirmation and design files to this address.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-grow px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg"
            />
            <button
              onClick={() => handleBuy('professional')}
              disabled={loading || !email}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'Processing...' : 'Start with Professional'}
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-4 text-center">
            All payments are secure and processed by Stripe.
          </p>
        </div>

        {/* Trust & Security */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8">
            <div className="text-gray-500">✓ Secure SSL Encryption</div>
            <div className="text-gray-500">✓ PCI Compliant</div>
            <div className="text-gray-500">✓ 30-Day Support</div>
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-2">Testing Instructions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 text-sm">
            <div>
              <div className="font-medium mb-1">Test Card:</div>
              <code className="bg-blue-100 px-3 py-1 rounded font-mono">4242 4242 4242 4242</code>
            </div>
            <div>
              <div className="font-medium mb-1">Other Details:</div>
              <div>Any future expiration date</div>
              <div>Any 3-digit CVC</div>
              <div>Any ZIP code</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}