import Hero from '@/components/Hero'
import TrustElements from '@/components/TrustElements'
import PricingSection from '@/components/PricingSection'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustElements />
      <PricingSection />
      
      {/* Final CTA - 优化转化 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join 200+ satisfied clients who trust us with their design needs.
            Your satisfaction is 100% guaranteed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <a 
              href="#pricing" 
              className="px-12 py-5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 text-lg"
            >
              🚀 GET STARTED NOW
            </a>
            
            <a 
              href="mailto:contact@wedesign.design" 
              className="px-12 py-5 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg"
            >
              📞 FREE CONSULTATION
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-white">✅</span>
              <span>Professional Design Team</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">✅</span>
              <span>Unlimited Revisions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">✅</span>
              <span>Source Files Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">✅</span>
              <span>100% Money-back Guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}