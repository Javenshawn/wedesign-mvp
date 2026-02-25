'use client'

import Logo from './Logo'
import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Home
            </a>
            <a href="/cases" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Case Studies
            </a>
            <a href="/#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Pricing
            </a>
            <a href="/admin" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Orders
            </a>
            <a 
              href="https://calendly.com/wedesign/consultation" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-3">
              <a 
                href="/" 
                className="block text-gray-700 hover:text-blue-600 font-medium transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/cases" 
                className="block text-gray-700 hover:text-blue-600 font-medium transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Case Studies
              </a>
              <a 
                href="/#pricing" 
                className="block text-gray-700 hover:text-blue-600 font-medium transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="/admin" 
                className="block text-gray-700 hover:text-blue-600 font-medium transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Orders
              </a>
              <a 
                href="https://calendly.com/wedesign/consultation" 
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}