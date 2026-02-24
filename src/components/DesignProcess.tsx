'use client'

import { FileText, MessageSquare, Palette, CheckCircle, Rocket, Headphones } from 'lucide-react'

const processSteps = [
  {
    icon: FileText,
    title: 'Brief & Discovery',
    description: 'We start by understanding your business, goals, and design needs through a detailed questionnaire.',
    duration: '1-2 hours',
    deliverables: ['Project Brief', 'Goals Document', 'Timeline Plan'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: MessageSquare,
    title: 'Strategy & Concept',
    description: 'Our team creates design concepts and strategies tailored to your brand and target audience.',
    duration: '1-2 days',
    deliverables: ['Mood Boards', 'Concept Sketches', 'Style Directions'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Palette,
    title: 'Design & Creation',
    description: 'We bring concepts to life with professional design execution and attention to detail.',
    duration: '2-4 days',
    deliverables: ['Initial Designs', 'Color Palettes', 'Typography Systems'],
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: CheckCircle,
    title: 'Review & Refine',
    description: 'You review the designs and provide feedback. We make unlimited revisions until perfect.',
    duration: '1-3 days',
    deliverables: ['Feedback Implementation', 'Design Refinements', 'Final Adjustments'],
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Rocket,
    title: 'Delivery & Launch',
    description: 'Receive all final design files and assets, ready to use across all your platforms.',
    duration: '1 day',
    deliverables: ['Source Files', 'Export Formats', 'Usage Guidelines'],
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    description: 'Get 30 days of free support for any questions or minor adjustments after delivery.',
    duration: '30 days',
    deliverables: ['Technical Support', 'Minor Revisions', 'Expert Advice'],
    color: 'from-indigo-500 to-indigo-600'
  }
]

export default function DesignProcess() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
            <span className="font-bold">🎯 OUR PROCESS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Professional Design Process
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            We follow a proven 6-step process to ensure exceptional results and client satisfaction.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white border-2 border-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl shadow-lg z-10">
                {index + 1}
              </div>
              
              {/* Process Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 h-full transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{step.title}</h3>
                    <p className="text-neutral-600">{step.description}</p>
                  </div>
                  
                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-neutral-700">Duration: {step.duration}</span>
                  </div>
                  
                  {/* Deliverables */}
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-2">Deliverables:</h4>
                    <ul className="space-y-1">
                      {step.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm text-neutral-600">
                          <span className="text-green-500 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">Timeline Overview</h3>
            <p className="text-neutral-600">Most projects are completed within 3-7 business days</p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transform -translate-y-1/2"></div>
            
            {/* Timeline Points */}
            <div className="relative flex justify-between">
              {['Day 1', 'Day 2-3', 'Day 4-5', 'Day 6-7'].map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-white border-4 border-blue-500 rounded-full mb-2"></div>
                  <div className="text-sm font-medium text-neutral-700">{day}</div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {index === 0 && 'Brief & Strategy'}
                    {index === 1 && 'Design Creation'}
                    {index === 2 && 'Review & Refine'}
                    {index === 3 && 'Final Delivery'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Start Your Project?</h3>
              <p className="text-blue-100">
                Our professional process ensures you get exceptional results every time.
              </p>
            </div>
            <a 
              href="#pricing" 
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
            >
              View Plans & Start Today
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}