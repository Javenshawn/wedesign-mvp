'use client'

export default function Home() {
  const handleCheckout = async (plan: string) => {
    try {
      // 获取用户邮箱（简单实现）
      const email = prompt('Please enter your email for order confirmation:')
      if (!email) {
        alert('Email is required for order confirmation')
        return
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address')
        return
      }

      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan, email }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment system error')
      }
      
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Error creating checkout session')
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      alert(error.message || 'Payment system error')
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Wedesign</h1>
          <p className="text-gray-600 mt-2">Professional Design Services</p>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="border rounded-lg p-6 shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Basic Package</h3>
              <p className="text-4xl font-bold mb-4">$299</p>
              <ul className="space-y-2 mb-6">
                <li>• Basic logo design</li>
                <li>• 3 initial concepts</li>
                <li>• 2 revision rounds</li>
                <li>• Standard file formats</li>
                <li>• 7-10 business days</li>
              </ul>
              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={() => handleCheckout('basic')}
              >
                Choose Basic
              </button>
            </div>

            {/* Standard Package */}
            <div className="border rounded-lg p-6 shadow-lg border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Standard Package</h3>
              <p className="text-4xl font-bold mb-4">$599</p>
              <ul className="space-y-2 mb-6">
                <li>• Complete logo design</li>
                <li>• 5 initial concepts</li>
                <li>• 4 revision rounds</li>
                <li>• Source files (AI, EPS, SVG)</li>
                <li>• 5-7 business days</li>
              </ul>
              <button 
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                onClick={() => handleCheckout('standard')}
              >
                Choose Standard
              </button>
            </div>

            {/* Premium Package */}
            <div className="border rounded-lg p-6 shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Premium Package</h3>
              <p className="text-4xl font-bold mb-4">$999</p>
              <ul className="space-y-2 mb-6">
                <li>• Brand system design</li>
                <li>• 8 initial concepts</li>
                <li>• Unlimited revisions</li>
                <li>• All source files</li>
                <li>• 3-5 business days</li>
              </ul>
              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={() => handleCheckout('premium')}
              >
                Choose Premium
              </button>
            </div>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t">
          <p className="text-gray-600">© 2024 Wedesign. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}