import Hero from '@/components/Hero'
import PricingSection from '@/components/PricingSection'

export default function Home() {
  return (
    <>
      <Hero />
      <PricingSection />
      
      {/* Final CTA */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Professional Designs?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose a plan, pay securely, and our professional design team will create stunning designs for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#pricing" 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              View Pricing Plans
            </a>
            <a 
              href="mailto:contact@wedesign.design" 
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition"
            >
              Free Consultation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}