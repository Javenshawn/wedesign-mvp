'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Shield, Zap, Star } from 'lucide-react'
import { Button } from './ui/Button'
import { Card, CardContent } from './ui/Card'

export default function Hero() {
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

  const valueProps = [
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Crafted by senior designers with 10+ years experience',
      color: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: '3-7 days turnaround with 24-hour response time',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Shield,
      title: 'Risk-Free',
      description: 'Unlimited revisions & 100% money-back guarantee',
      color: 'from-green-500/20 to-emerald-500/20'
    }
  ]

  const metrics = [
    { value: '200+', label: 'Satisfied Clients', sublabel: 'Worldwide' },
    { value: '500+', label: 'Projects Completed', sublabel: 'Zero Failure' },
    { value: '98%', label: 'Client Satisfaction', sublabel: 'Real Reviews' },
    { value: '24/7', label: 'Customer Support', sublabel: 'Always Responsive' }
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/5 via-transparent to-transparent rounded-full translate-x-1/4 translate-y-1/4" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10" />
      </div>

      <div className="container relative py-24 md:py-32">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="text-center"
        >
          {/* Professional Badge */}
          <motion.div variants={fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-8 animate-pulse-glow">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-primary">
                🏆 Professional Design Team • 10+ Years Experience
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Create</span>
              <span className="primary-gradient-text font-heading">
                Professional, Memorable
              </span>
              <span className="block">Designs for Your Brand</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div variants={fadeInUp}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              We&apos;re not just designers, we&apos;re brand builders. From startups to established enterprises,
              we help clients achieve business growth through exceptional design.
            </p>
          </motion.div>

          {/* Value Propositions */}
          <motion.div 
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            {valueProps.map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card hoverEffect className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 mx-auto`}>
                      <item.icon className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 font-heading">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              variant="gradient" 
              size="xl"
              className="group"
              asChild
            >
              <a href="#pricing">
                View Professional Plans
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              asChild
            >
              <a href="/cases">
                View Case Studies
              </a>
            </Button>
          </motion.div>

          {/* Trust Metrics */}
          <motion.div variants={fadeInUp}>
            <Card className="max-w-4xl mx-auto border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold primary-gradient-text mb-2">
                        {metric.value}
                      </div>
                      <div className="text-foreground font-medium">{metric.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{metric.sublabel}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Badges */}
          <motion.div variants={fadeInUp} className="mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <div className="text-muted-foreground font-medium">Payment Security:</div>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Stripe Payment</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                  <Star className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Money-back Guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notable Clients */}
          <motion.div variants={fadeInUp} className="mt-16">
            <div className="text-muted-foreground mb-6 font-medium">Trusted by Notable Brands:</div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 opacity-70">
              {['TechStart', 'GreenLeaf', 'FinTech Pro', 'Creative Lab', 'Brand Masters'].map((brand, index) => (
                <div 
                  key={index}
                  className="text-foreground font-bold text-lg hover:primary-gradient-text transition-all duration-300"
                >
                  {brand}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-10 h-16 border-2 border-border rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}