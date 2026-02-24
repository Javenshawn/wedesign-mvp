'use client'

import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    company: 'TechStart Inc.',
    role: 'CEO',
    rating: 5,
    content: 'The Wedesign team delivered exceptional work that perfectly captured our brand vision. Our new identity has helped us secure $2M in funding and attract top talent. The process was smooth and professional.',
    project: 'Complete Brand Identity',
    package: 'Premium',
    result: 'Secured $2M funding, 45% increase in brand recognition',
    avatar: 'AJ'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    company: 'GreenLeaf Organics',
    role: 'Marketing Director',
    rating: 5,
    content: 'Our packaging redesign led to a 30% increase in sales within the first quarter. The team understood our eco-friendly mission and created designs that truly resonate with our customers.',
    project: 'Packaging & Branding',
    package: 'Professional',
    result: '30% sales increase, expanded to 3 new markets',
    avatar: 'SC'
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    company: 'FinTech Solutions',
    role: 'Founder',
    rating: 4,
    content: 'Professional service with excellent attention to detail. Our new corporate identity has been well received by investors and helped us close a major funding round.',
    project: 'Corporate Identity',
    package: 'Basic',
    result: 'Successfully closed Series A funding',
    avatar: 'MR'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    company: 'Creative Lab Studios',
    role: 'Creative Director',
    rating: 5,
    content: 'The website redesign has doubled our lead generation. The design is both beautiful and functional, perfectly showcasing our portfolio to potential clients.',
    project: 'Website Redesign',
    package: 'Professional',
    result: '100% increase in leads, 40% faster page load',
    avatar: 'EW'
  },
  {
    id: 5,
    name: 'David Kim',
    company: 'Urban Fitness',
    role: 'Owner',
    rating: 5,
    content: 'Outstanding work that perfectly captures our brand ethos. Membership signups increased by 45% after launching our new brand identity and marketing materials.',
    project: 'Brand Identity & Marketing',
    package: 'Premium',
    result: '45% membership growth, expanded to 2 new locations',
    avatar: 'DK'
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    company: 'EcoPack Solutions',
    role: 'Sustainability Manager',
    rating: 4,
    content: 'The designs not only look great but effectively communicate our sustainability mission. We\'ve received excellent feedback from both customers and industry partners.',
    project: 'Sustainable Packaging',
    package: 'Basic',
    result: '25% increase in B2B partnerships',
    avatar: 'LT'
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6">
            <span className="font-bold">💬 CLIENT SUCCESS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what businesses like yours have to say.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 md:p-12">
            {/* Quote Icon */}
            <div className="text-blue-500 mb-6">
              <Quote className="h-12 w-12" />
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <p className="text-xl text-neutral-700 italic">
                "{currentTestimonial.content}"
              </p>
              
              {/* Client Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {currentTestimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-neutral-900">{currentTestimonial.name}</div>
                  <div className="text-neutral-600">{currentTestimonial.role}, {currentTestimonial.company}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < currentTestimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-300'}`}
                      />
                    ))}
                    <span className="text-sm text-neutral-500 ml-2">{currentTestimonial.rating}/5</span>
                  </div>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-neutral-600 mb-1">Project</div>
                  <div className="font-bold text-blue-700">{currentTestimonial.project}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-neutral-600 mb-1">Package</div>
                  <div className="font-bold text-green-700">{currentTestimonial.package}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-neutral-600 mb-1">Result</div>
                  <div className="font-bold text-purple-700">{currentTestimonial.result}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={prevTestimonial}
            className="p-3 bg-white border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-neutral-600" />
          </button>
          
          {/* Testimonial Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="p-3 bg-white border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-neutral-600" />
          </button>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className={`bg-white rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${
                testimonial.id === currentTestimonial.id 
                  ? 'border-blue-500 shadow-md' 
                  : 'border-neutral-200'
              }`}
              onClick={() => setCurrentIndex(testimonial.id - 1)}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-neutral-900">{testimonial.name}</div>
                  <div className="text-sm text-neutral-600">{testimonial.company}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-neutral-600 text-sm line-clamp-3">
                "{testimonial.content}"
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <div className="text-xs text-neutral-500">{testimonial.project}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}