import Hero from '@/components/Hero'
import TrustElements from '@/components/TrustElements'
import PricingSection from '@/components/PricingSection'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustElements />
      <PricingSection />
      
      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Choose the plan that fits your needs, and our professional design team will create stunning designs for you.
            Every design carries our commitment to quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="#pricing" 
              className="px-10 py-5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Plans Now
            </a>
            <a 
              href="mailto:contact@wedesign.design" 
              className="px-10 py-5 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              Free Consultation
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>Professional Design Team</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>Unlimited Revisions</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>Source Files Delivery</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>Commercial Usage Rights</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>30-Day Free Support</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}