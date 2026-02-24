'use client'

import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleBuy = async () => {
    if (!email) {
      alert('Please enter your email')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: 'price_1T4CWWCY5vZ28ogKbNxKWfaf', // 基础套餐 price_id
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 pt-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Professional Design Services
          </h1>
          <p className="text-xl text-gray-600">
            Get your brand designed by professionals. Simple, fast, effective.
          </p>
        </header>

        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Basic Design Package</h2>
            <div className="text-5xl font-bold text-blue-600 mb-4">$299</div>
            <p className="text-gray-600 text-lg">
              Perfect for startups and small businesses
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span>Logo Design (3 concepts)</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span>2 Revisions</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span>Source Files (AI, PDF, PNG)</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span>7-Day Delivery</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">
              Your Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Buy Button */}
          <button
            onClick={handleBuy}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Buy Now - $299'}
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Secure payment powered by Stripe
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
      </div>
    </main>
  )
}