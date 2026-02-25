// 白色背景的简约专业设计 - 深度克隆您的Figma网站
export default function HomeClean() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* 简约导航栏 */}
      <nav className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900">Wedesign</div>
            <div className="space-x-8 hidden md:flex">
              <a href="#services" className="text-gray-600 hover:text-gray-900 font-medium">Services</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
              <a href="#cases" className="text-gray-600 hover:text-gray-900 font-medium">Case Studies</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</a>
            </div>
            <button className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-medium">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* 简约英雄区 */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full mb-8 font-medium">
            Professional Design Services
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 max-w-4xl mx-auto">
            Create stunning designs that
            <span className="block text-gray-900 mt-4">grow your business</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Expert logo, website, and branding design services with fast delivery and satisfaction guarantee.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-20">
            <button className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-lg font-bold text-lg">
              Start Your Project
            </button>
            <button className="border-2 border-gray-300 hover:border-gray-900 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg">
              View Pricing
            </button>
          </div>
          
          {/* 简约特性 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 border border-gray-200 rounded-2xl">
              <div className="text-3xl font-bold text-gray-900 mb-4">10+</div>
              <div className="text-xl font-bold text-gray-900 mb-2">Years Experience</div>
              <div className="text-gray-600">Expert certified designers</div>
            </div>
            <div className="p-6 border border-gray-200 rounded-2xl">
              <div className="text-3xl font-bold text-gray-900 mb-4">3-7</div>
              <div className="text-xl font-bold text-gray-900 mb-2">Days Delivery</div>
              <div className="text-gray-600">Fast turnaround guaranteed</div>
            </div>
            <div className="p-6 border border-gray-200 rounded-2xl">
              <div className="text-3xl font-bold text-gray-900 mb-4">100%</div>
              <div className="text-xl font-bold text-gray-900 mb-2">Satisfaction</div>
              <div className="text-gray-600">Money-back guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* 简约服务区 */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-4xl mb-6">🎨</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Brand Design</h3>
              <p className="text-gray-600 mb-6">Logo, identity, and brand guidelines that make your business stand out.</p>
              <button className="text-gray-900 font-medium hover:text-black">Learn more →</button>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-4xl mb-6">🌐</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Website Design</h3>
              <p className="text-gray-600 mb-6">Modern, responsive websites that convert visitors into customers.</p>
              <button className="text-gray-900 font-medium hover:text-black">Learn more →</button>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="text-4xl mb-6">📱</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">App Design</h3>
              <p className="text-gray-600 mb-6">User-friendly mobile and web applications with great UX/UI.</p>
              <button className="text-gray-900 font-medium hover:text-black">Learn more →</button>
            </div>
          </div>
        </div>
      </section>

      {/* 简约定价区 */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl border border-gray-300">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Basic</h3>
              <div className="text-4xl font-bold mb-6 text-gray-900">$299</div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li>✓ Logo Design</li>
                <li>✓ 2 Revisions</li>
                <li>✓ 3-5 Days</li>
                <li>✓ Source Files</li>
              </ul>
              <button className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg font-bold">
                Choose Basic
              </button>
            </div>
            
            <div className="bg-gray-900 text-white p-8 rounded-2xl border border-gray-900">
              <div className="inline-block px-4 py-1 bg-white/20 rounded-full mb-4 text-sm">MOST POPULAR</div>
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <div className="text-4xl font-bold mb-6">$599</div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li>✓ Complete Brand Identity</li>
                <li>✓ Unlimited Revisions</li>
                <li>✓ 5-7 Days</li>
                <li>✓ All Source Files</li>
                <li>✓ 30-Day Support</li>
              </ul>
              <button className="w-full bg-white text-gray-900 hover:bg-gray-100 py-3 rounded-lg font-bold">
                Choose Professional
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-300">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Premium</h3>
              <div className="text-4xl font-bold mb-6 text-gray-900">$999</div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li>✓ Brand + Website</li>
                <li>✓ Unlimited Revisions</li>
                <li>✓ 7-10 Days</li>
                <li>✓ All Source Files</li>
                <li>✓ 60-Day Support</li>
                <li>✓ Priority Service</li>
              </ul>
              <button className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg font-bold">
                Choose Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 简约联系表单 */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Get Your Free Quote</h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Your Name</label>
                <input type="text" className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20" placeholder="John Smith" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                <input type="email" className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Project Details</label>
                <textarea className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-20 h-32" placeholder="Tell us about your project..."></textarea>
              </div>
              <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-lg font-bold text-lg">
                SEND REQUEST
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 简约页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold mb-2">Wedesign</div>
              <div className="text-gray-400">Professional Design Services</div>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <div>© 2024 Wedesign. All rights reserved.</div>
              <div className="mt-2">contact@wedesign.design</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}