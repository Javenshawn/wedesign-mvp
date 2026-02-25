'use client'

export default function TrustElements() {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Wedesign?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just design, we create visual solutions that drive business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Professional Certification */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
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
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Client Trust</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">200+</div>
                <div className="text-gray-600">Satisfied Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>

          {/* Quality Assurance */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Quality Assurance</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Unlimited Revisions Until Satisfied</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>100% Original Design</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Source Files Delivery</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>Commercial Usage Rights</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <span>30-Day Free Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Security */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                💳 Payment Security & Guarantee
              </h3>
              <p className="text-gray-600 mb-4">
                Secure payments via Stripe with bank-grade encryption. We never store your credit card information.
                Your payment is protected by our satisfaction guarantee.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">🔒</span>
                  <span className="font-medium">SSL Encryption</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">🛡️</span>
                  <span className="font-medium">PCI Compliant</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="font-medium">Money-back Guarantee</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl">💳</div>
                <div className="text-sm font-medium mt-2">Credit Card</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl">🏦</div>
                <div className="text-sm font-medium mt-2">Bank Transfer</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl">📱</div>
                <div className="text-sm font-medium mt-2">Digital Wallet</div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            📣 Client Testimonials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">👨‍💼</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Alex Johnson</div>
                  <div className="text-gray-600 text-sm">CEO, TechStart Inc.</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Wedesign created the perfect visual identity for our brand. Their professionalism exceeded expectations, from communication to delivery. Highly recommended!"
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">👩‍💼</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Chen</div>
                  <div className="text-gray-600 text-sm">Founder, GreenLeaf Organic</div>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Exceptional packaging design! They completely understood our brand philosophy, creating designs that are both beautiful and practical. Customer service is responsive and attentive."
              </p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ❓ Frequently Asked Questions
          </h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Q: What is the design process like?</h4>
              <p className="text-gray-600">
                A: 1) Requirements discussion → 2) Concept design → 3) Initial draft presentation → 4) Revision and adjustment → 5) Final delivery. The entire process is transparent, and you can provide feedback at any stage.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Q: What if I'm not satisfied with the design?</h4>
              <p className="text-gray-600">
                A: We offer unlimited revisions until you're completely satisfied. If you're still not happy with the final result, we provide a 100% money-back guarantee.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Q: What file formats do you deliver?</h4>
              <p className="text-gray-600">
                A: We deliver all source files (AI, PSD, PDF, PNG, SVG, etc.) along with commercial usage rights, so you can use and modify them freely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}