export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Professional Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-8">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="font-medium">Professional Design Team • 10+ Years Experience</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Get Professional Designs
          <br />
          <span className="text-blue-600">For Your Business</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          We create stunning logos, websites, and branding materials that help businesses stand out and grow.
          Fast delivery, unlimited revisions, 100% satisfaction guaranteed.
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

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a 
            href="#pricing" 
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            View Professional Plans
          </a>
          
          <a 
            href="/cases" 
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
          >
            View Case Studies
          </a>
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