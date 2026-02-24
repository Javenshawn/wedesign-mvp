'use client'

import { motion } from 'framer-motion'
import { Award, Users, Clock, FileText, Globe, Headphones } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'

export default function TrustElements() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const trustCards = [
    {
      icon: Award,
      title: 'Professional Certification',
      color: 'from-blue-500/10 to-blue-600/10',
      items: [
        '10+ Years Design Experience',
        'Adobe Certified Designer',
        'UI/UX Professional Certification',
        'Brand Strategy Expert'
      ]
    },
    {
      icon: Users,
      title: 'Client Trust',
      color: 'from-green-500/10 to-green-600/10',
      stats: [
        { value: '98%', label: 'Client Satisfaction' },
        { value: '4.9/5', label: 'Average Rating' },
        { value: '200+', label: 'Repeat Clients' }
      ]
    },
    {
      icon: Clock,
      title: 'Process Excellence',
      color: 'from-purple-500/10 to-purple-600/10',
      items: [
        '3-7 Days Standard Delivery',
        '24-Hour Response Time',
        'Unlimited Revisions',
        'Source Files Included'
      ]
    }
  ]

  const processSteps = [
    {
      icon: FileText,
      title: 'Brief & Quote',
      description: 'Submit your requirements, get a detailed quote',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      icon: Users,
      title: 'Design & Review',
      description: 'Our team creates designs, you review and provide feedback',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    },
    {
      icon: Globe,
      title: 'Global Delivery',
      description: 'Receive final designs with source files, worldwide',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
    },
    {
      icon: Headphones,
      title: 'Ongoing Support',
      description: '30-day free support for any adjustments',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Why Choose <span className="primary-gradient-text">Wedesign</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We don&apos;t just design, we create visual solutions that drive business growth
            </p>
          </motion.div>

          {/* Trust Cards */}
          <motion.div 
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {trustCards.map((card, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card hoverEffect className="h-full border-border/50">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 mx-auto`}>
                      <card.icon className="h-8 w-8 text-foreground" />
                    </div>
                    
                    <CardTitle className="text-xl text-center mb-6">
                      {card.title}
                    </CardTitle>

                    {'items' in card ? (
                      <ul className="space-y-3">
                        {card.items.map((item, i) => (
                          <li key={i} className="flex items-center text-muted-foreground">
                            <span className="text-green-600 mr-2">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="space-y-4">
                        {card.stats?.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-3xl font-bold primary-gradient-text mb-1">
                              {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Process Steps */}
          <motion.div variants={fadeInUp}>
            <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-heading">
                  Simple & Transparent Process
                </CardTitle>
                <p className="text-muted-foreground">
                  From brief to delivery, we make it easy and predictable
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {processSteps.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Connector Line */}
                      {index < processSteps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent -translate-x-1/2" />
                      )}
                      
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-4 mx-auto`}>
                          <step.icon className="h-8 w-8" />
                        </div>
                        
                        <div className="flex items-center justify-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                        </div>
                        
                        <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security & Guarantee */}
          <motion.div variants={fadeInUp} className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-green-600">🔒</span>
                    Security & Privacy
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>End-to-end SSL encryption</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>GDPR compliant data handling</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Secure payment processing via Stripe</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Client data never shared with third parties</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-blue-600">🛡️</span>
                    Quality Guarantee
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>100% money-back guarantee</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Unlimited revisions until satisfied</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>30-day free support after delivery</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>Source files included with all plans</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div 
            variants={fadeInUp}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
              <div className="text-left">
                <h3 className="text-xl font-bold mb-2">Ready to transform your brand?</h3>
                <p className="text-muted-foreground text-sm">
                  Join 200+ satisfied clients who trust us with their design needs
                </p>
              </div>
              <a 
                href="#pricing" 
                className="px-8 py-3 bg-gradient-to-r from-primary to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 whitespace-nowrap"
              >
                View Plans & Pricing
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}