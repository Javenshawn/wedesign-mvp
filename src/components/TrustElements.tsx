'use client'

export default function TrustElements() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Businesses Trust Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We don't just design, we create solutions that drive real business results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Professional Certification */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Professional Certification</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>10+ Years Design Experience</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Adobe Certified Designer</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>UI/UX Professional Certification</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Brand Strategy Expert</span>
              </li>
            </ul>
          </div>

          {/* Client Trust */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Client Trust</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">98%</div>
                <div className="text-gray-600">Client Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">4.9/5</div>
                <div className="text-gray-600">Average Client Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">200+</div>
                <div className="text-gray-600">Repeat Clients</div>
              </div>
            </div>
          </div>

          {/* Process Excellence */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Process Excellence</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>3-7 Days Standard Delivery</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>24-Hour Response Time</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Unlimited Revisions</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Source Files Included</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Security & Guarantee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-green-600">🔒</span>
              Security & Privacy
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>End-to-end SSL encryption</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>GDPR compliant data handling</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Secure payment processing via Stripe</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Client data never shared with third parties</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-blue-600">🛡️</span>
              Quality Guarantee
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✓</span>
                <span>100% money-back guarantee</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Unlimited revisions until satisfied</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✓</span>
                <span>30-day free support after delivery</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Source files included with all plans</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}