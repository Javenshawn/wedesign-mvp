'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from './ui/Button'
import Logo from './Logo'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Case Studies', href: '/cases' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Orders', href: '/admin' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold font-heading primary-gradient-text">
            Wedesign
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors hover:primary-gradient-text"
            >
              {item.name}
            </Link>
          ))}
          
          <Button 
            variant="gradient" 
            size="sm"
            className="ml-4"
            asChild
          >
            <Link 
              href="https://calendly.com/wedesign/consultation" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Consultation
            </Link>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground/70 hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="container py-4 space-y-3 border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-medium text-foreground/70 hover:text-foreground hover:primary-gradient-text transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t">
              <Button 
                variant="gradient" 
                className="w-full"
                asChild
              >
                <Link 
                  href="https://calendly.com/wedesign/consultation" 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}