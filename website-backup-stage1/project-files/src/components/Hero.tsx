'use client'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          
          {/* Professional Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 mb-8">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-blue-800 font-medium">
              🏆 Professional Design Team • 10+ Years Experience • 200+ Satisfied Clients
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Create
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Professional, Memorable Designs
            </span>
            for Your Brand
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            We're not just designers, we're brand builders. From startups to established enterprises,
            we help clients achieve business growth through exceptional design.
          </p>

          {/* Core Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Professional Design</h3>
              <p className="text-gray-600 text-sm">
                Crafted by senior designers ensuring every design meets industry standards
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                3-7 days for standard projects, 24-hour response for urgent requests
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Satisfaction Guarantee</h3>
              <p className="text-gray-600 text-sm">
                Unlimited revisions, 30-day free support, 100% money-back guarantee
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a 
              href="#pricing" 
              className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center text-lg"
            >
              <span>View Professional Plans</span>
              <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
            </a>
            
            <a 
              href="/cases" 
              className="px-10 py-5 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 inline-flex items-center text-lg"
            >
              <span>View Case Studies</span>
              <span className="ml-3">📁</span>
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl p-8 max-w-3xl mx-auto border border-blue-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-gray-700 font-medium">Satisfied Clients</div>
                <div className="text-gray-500 text-sm mt-1">Worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-700 font-medium">Projects Completed</div>
                <div className="text-gray-500 text-sm mt-1">Zero Failure Record</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-700 font-medium">Client Satisfaction</div>
                <div className="text-gray-500 text-sm mt-1">Based on Real Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-700 font-medium">Customer Support</div>
                <div className="text-gray-500 text-sm mt-1">Always Responsive</div>
              </div>
            </div>
          </div>

          {/* Payment Security */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-gray-600 font-medium">Payment Security:</div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-green-600 mr-2">🔒</span>
                <span className="font-medium">SSL Encryption</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-blue-600 mr-2">💳</span>
                <span className="font-medium">Stripe Payment</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <span className="text-purple-600 mr-2">🛡️</span>
                <span className="font-medium">Money-back Guarantee</span>
              </div>
            </div>
          </div>

          {/* Notable Clients */}
          <div className="mt-16">
            <div className="text-gray-600 mb-6 font-medium">Trusted by Notable Brands:</div>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              <div className="text-gray-700 font-bold text-lg">TechStart</div>
              <div className="text-gray-700 font-bold text-lg">GreenLeaf</div>
              <div className="text-gray-700 font-bold text-lg">FinTech Pro</div>
              <div className="text-gray-700 font-bold text-lg">Creative Lab</div>
              <div className="text-gray-700 font-bold text-lg">Brand Masters</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-10 h-16 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}