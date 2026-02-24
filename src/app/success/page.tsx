'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getOrderBySessionId } from '@/lib/supabase'

interface Order {
  id: string
  email: string
  stripe_session_id: string
  plan: string
  amount: number
  status: string
  created_at: string
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrder() {
      if (!sessionId) {
        setError('No session ID provided')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const orderData = await getOrderBySessionId(sessionId)
        
        if (orderData) {
          setOrder(orderData)
        } else {
          setError('Order not found. It may take a few moments to process.')
          
          // 如果没有找到订单，等待3秒后重试
          setTimeout(() => {
            fetchOrder()
          }, 3000)
        }
      } catch (err: any) {
        console.error('Error fetching order:', err)
        setError('Failed to load order details')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [sessionId])

  const formatAmount = (amount: number) => {
    return `$${(amount / 100).toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPlanName = (plan: string) => {
    const planNames: Record<string, string> = {
      basic: 'Basic Package',
      standard: 'Standard Package',
      premium: 'Premium Package'
    }
    return planNames[plan] || plan
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-6"></div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Processing Your Order</h1>
            <p className="text-gray-600">Please wait while we confirm your payment...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-yellow-500 text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Processing</h1>
            <p className="text-gray-600 mb-6">
              {error || 'Your order is being processed. This may take a few moments.'}
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Session ID: {sessionId?.substring(0, 20)}...
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Refresh Status
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <span className="text-4xl text-green-600">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your order. We've sent a confirmation to {order.email}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl font-bold text-gray-900">Order Confirmation</h2>
            <p className="text-gray-600">Order #{order.id.substring(0, 8)}</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-semibold">{getPlanName(order.plan)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-bold text-green-600">{formatAmount(order.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span className="font-medium">{formatDate(order.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                    <p className="font-mono text-sm text-gray-700 break-all">
                      {order.stripe_session_id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  <span>You will receive a confirmation email within 15 minutes</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  <span>Our design team will contact you within 24 hours to discuss your project</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  <span>Begin preparing any brand materials or references you'd like to share</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
          >
            Return to Homepage
          </button>
          <button
            onClick={() => window.location.href = '/admin'}
            className="px-8 py-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold text-lg"
          >
            View All Orders
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800 mb-4">
            If you have any questions about your order, please contact us at support@wedesign.com
          </p>
          <p className="text-sm text-blue-700">
            Your satisfaction is our priority. We're here to help!
          </p>
        </div>
      </div>
    </main>
  )
}