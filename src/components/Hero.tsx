export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Professional Badge - 增加紧迫感 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full mb-8 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="font-bold">🚀 LIMITED TIME OFFER • 10+ Years Experience</span>
        </div>

        {/* Main Headline - 增加情感共鸣 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Professional Designs That
          <br />
          <span className="text-blue-600">Grow Your Business</span>
        </h1>

        {/* Subheadline - 增加价值主张 */}
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Get stunning logos, websites, and branding that attract customers and increase sales.
          <span className="block mt-2 text-lg font-medium text-blue-600">
            ✅ Unlimited Revisions • ✅ 100% Money-back • ✅ Fast Delivery
          </span>
        </p>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="p-6 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Crafted by senior designers with 10+ years experience</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">3-7 days turnaround with 24-hour response time</p>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Risk-Free</h3>
            <p className="text-gray-600">Unlimited revisions & 100% money-back guarantee</p>
          </div>
        </div>

        {/* Call to Action - 优化按钮文案和设计 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a 
            href="#pricing" 
            className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
          >
            🚀 GET STARTED - View Plans
          </a>
          
          <a 
            href="/cases" 
            className="px-10 py-5 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 text-lg"
          >
            📊 See Real Results
          </a>
        </div>
        
        {/* 增加社会证明 */}
        <div className="mb-8">
          <p className="text-gray-600 mb-3">Trusted by 200+ businesses worldwide:</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-70">
            {['TechStart', 'GreenLeaf', 'FinTech Pro', 'Creative Lab', 'Brand Masters'].map((brand, index) => (
              <div 
                key={index}
                className="text-gray-700 font-bold hover:text-blue-600 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="max-w-3xl mx-auto p-8 bg-gray-50 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-700">Satisfied Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-700">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-700">Customer Support</div>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-8">
          <div className="text-gray-600 mb-4">Payment Security:</div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
              <span className="text-green-600">✓</span>
              <span className="font-medium">SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-blue-600">🛡️</span>
              <span className="font-medium">Stripe Payment</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg border border-purple-200">
              <span className="text-purple-600">⭐</span>
              <span className="font-medium">Money-back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}