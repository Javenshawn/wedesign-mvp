import Hero from '@/components/Hero'
import TrustElements from '@/components/TrustElements'
import PricingSection from '@/components/PricingSection'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CheckCircle, Mail } from 'lucide-react'

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const benefits = [
    'Professional Design Team',
    'Unlimited Revisions',
    'Source Files Delivery',
    'Commercial Usage Rights',
    '30-Day Free Support'
  ]

  return (
    <>
      <Hero />
      <TrustElements />
      <PricingSection />
      
      {/* Final CTA */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-20 relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 -z-10" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent -z-10" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-white/5 to-transparent rounded-full -translate-x-1/4 translate-y-1/4 -z-10" />
        
        <div className="container relative text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Choose the plan that fits your needs, and our professional design team will create stunning designs for you.
            Every design carries our commitment to quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              variant="default" 
              size="xl"
              className="bg-white text-primary hover:bg-white/90 font-bold shadow-xl"
              asChild
            >
              <a href="#pricing">
                View Plans Now
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="border-2 border-white text-white hover:bg-white/10 font-bold"
              asChild
            >
              <a href="mailto:contact@wedesign.design">
                <Mail className="mr-2 h-5 w-5" />
                Free Consultation
              </a>
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm"
              >
                <CheckCircle className="h-4 w-4 text-white" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  )
}