// 强制动态渲染，避免SSG问题
export const dynamic = 'force-dynamic'
export const revalidate = 0

import Hero from '@/components/Hero'
import TrustElements from '@/components/TrustElements'
import DesignProcess from '@/components/DesignProcess'
import Testimonials from '@/components/Testimonials'
import PricingSection from '@/components/PricingSection'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustElements />
      <DesignProcess />
      <Testimonials />
      <PricingSection />
      
      {/* Final CTA - 专业转化 */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-700 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-10 translate-x-1/4 translate-y-1/4"></div>
        </div>
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-bold">🚀 READY TO GROW YOUR BUSINESS</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Let's Create Something
              <br />
              <span className="text-green-400">Extraordinary Together</span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Join hundreds of successful businesses that trust us with their design needs.
              Your satisfaction is our priority, backed by our 100% money-back guarantee.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a 
                href="#pricing" 
                className="group px-14 py-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg flex items-center gap-3"
              >
                <span className="text-2xl">🎯</span>
                GET STARTED TODAY
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </a>
              
              <a 
                href="mailto:contact@wedesign.design" 
                className="px-14 py-6 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-lg"
              >
                📞 SCHEDULE FREE CONSULTATION
              </a>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">✅</div>
                <div className="text-sm text-blue-100">Professional Team</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm text-blue-100">Fast Delivery</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="text-sm text-blue-100">100% Guarantee</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">💯</div>
                <div className="text-sm text-blue-100">Unlimited Revisions</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}