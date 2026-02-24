'use client'

import { useState } from 'react'

export default function Home() {
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 pt-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Professional Design Services
          </h1>
          <p className="text-xl text-gray-600">
            Get your brand designed by professionals. Simple, fast, effective.
          </p>
        </header>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Basic Package */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic</h2>
              <div className="text-4xl font-bold text-blue-600 mb-4">$299</div>
              <p className="text-gray-600">Perfect for startups</p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>1 Logo Concept</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>2 Revisions</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>3-Day Delivery</span>
              </div>
            </div>
            <button
              onClick={() => handleBuy('basic')}
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Buy Basic - $299'}
            </button>
          </div>

          {/* Professional Package */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">POPULAR</span>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional</h2>
              <div className="text-4xl font-bold text-blue-600 mb-4">$599</div>
              <p className="text-gray-600">Best for growing businesses</p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>3 Logo Concepts</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Unlimited Revisions</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>2-Day Delivery</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Brand Guidelines</span>
              </div>
            </div>
            <button
              onClick={() => handleBuy('professional')}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Buy Professional - $599'}
            </button>
          </div>

          {/* Premium Package */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium</h2>
              <div className="text-4xl font-bold text-blue-600 mb-4">$999</div>
              <p className="text-gray-600">Complete brand solution</p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>5 Logo Concepts</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Unlimited Revisions</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>24-Hour Delivery</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Full Brand System</span>
              </div>
            </div>
            <button
              onClick={() => handleBuy('premium')}
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Buy Premium - $999'}
            </button>
          </div>
        </div>

        {/* Email Input */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <label className="block text-gray-700 mb-3 font-medium text-lg">
            Your Email Address (required for all purchases)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-lg"
          />
          <p className="text-gray-500 text-sm mt-2">
            We'll send order confirmation and design files to this email
          </p>
        </div>

        {/* Admin Link */}
        <div className="text-center">
          <a 
            href="/admin" 
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            View Orders (Admin)
          </a>
        </div>

        {/* Testing Info */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-medium text-yellow-900 mb-2">Testing Instructions</h3>
          <ul className="text-yellow-800 text-sm space-y-1">
            <li>• Use test card: <code className="bg-yellow-100 px-2 py-1 rounded">4242 4242 4242 4242</code></li>
            <li>• Any future expiration date</li>
            <li>• Any 3-digit CVC</li>
            <li>• Any ZIP code</li>
          </ul>
        </div>
      </div>
    </main>
  )
}