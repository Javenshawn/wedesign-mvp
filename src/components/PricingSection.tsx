'use client'

import { useState } from 'react'
import OrderFormModalEN from './OrderFormModalEN'

interface Plan {
  name: string
  price: number
  description: string
  features: string[]
  popular?: boolean
  priceId: string
}

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)

  const plans: Plan[] = [
    {
      name: 'Basic',
      price: 299,
      description: 'Perfect for startups and small businesses',
      features: [
        'Logo Design',
        'Business Card Design',
        'Color Palette',
        'Typography System',
        '3 Revisions',
        '5 Business Days Delivery',
        'Source Files Included',
        'Commercial Usage Rights'
      ],
      priceId: 'price_1T4ERcCY5vZ28ogKeAmpEtdq'
    },
    {
      name: 'Professional',
      price: 599,
      description: 'Ideal for growing businesses',
      features: [
        'Everything in Basic',
        'Complete Brand Identity',
        'Social Media Kit',
        'Email Signature',
        'Presentation Template',
        'Unlimited Revisions',
        '3 Business Days Delivery',
        'Priority Support',
        'Brand Guidelines PDF'
      ],
      popular: true,
      priceId: 'price_1T4ERcCY5vZ28ogKc0Vl6QfE'
    },
    {
      name: 'Premium',
      price: 999,
      description: 'Complete solution for established brands',
      features: [
        'Everything in Professional',
        'Website Design (up to 5 pages)',
        'Packaging Design',
        'Marketing Materials',
        'Apparel Design',
        'Signage Design',
        '24-Hour Response Time',
        'Dedicated Project Manager',
        '30-Day Free Support'
      ],
      priceId: 'price_1T4ESpCY5vZ28ogKit9ENo2g'
    }
  ]

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName)
    setShowModal(true)
  }

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header - 增加紧迫感和价值 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full mb-4">
            <span className="font-bold">🔥 LIMITED TIME DISCOUNT</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Invest in Your Brand's Success
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional design pays for itself. Choose a plan and start growing your business today.
            <span className="block mt-2 text-green-600 font-medium">
              ✅ All plans include unlimited revisions & 100% money-back guarantee
            </span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${plan.popular ? 'border-blue-500' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className="bg-blue-600 text-white text-center py-2 font-bold">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-8">
                {/* Plan Name & Price */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-2">one-time payment</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button - 优化文案和设计 */}
                <button
                  onClick={() => handlePlanSelect(plan.name)}
                  className={`w-full py-4 font-bold rounded-xl transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {plan.popular ? '🔥 ' : ''}
                  {plan.popular ? 'GET STARTED NOW' : `Select ${plan.name} Plan`}
                  {plan.popular ? ' 🚀' : ''}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included in All Plans</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Professional Design Team</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Unlimited Revisions</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Source Files Delivery</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Commercial Usage Rights</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>30-Day Free Support</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>100% Money-back Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Security */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Secure Payment via Stripe</p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-green-600">🔒</span>
              <span className="text-sm">SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">🛡️</span>
              <span className="text-sm">PCI Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600">⭐</span>
              <span className="text-sm">Money-back Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Form Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Select {selectedPlan} Plan
                </h3>
                <p className="text-gray-600">
                  You will be redirected to Stripe to complete your payment
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold text-blue-900 mb-2">Next Steps:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-blue-800">
                    <li>Click "Proceed to Payment" below</li>
                    <li>Complete the secure Stripe checkout</li>
                    <li>Receive order confirmation email</li>
                    <li>Our design team will contact you within 24 hours</li>
                  </ol>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      // 这里应该调用支付API
                      handlePlanSelect(selectedPlan)
                      setShowModal(false)
                      setSelectedPlan(null)
                    }}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                  >
                    Proceed to Payment
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setSelectedPlan(null)
                    }}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}