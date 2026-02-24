import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from './ui/Button'

const footerLinks = {
  Services: [
    { name: 'Logo Design', href: '/services/logo-design' },
    { name: 'Brand Identity', href: '/services/brand-identity' },
    { name: 'Packaging Design', href: '/services/packaging-design' },
    { name: 'Website Design', href: '/services/website-design' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Case Studies', href: '/cases' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refund' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/wedesign' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/wedesign' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/wedesign' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/wedesign' },
]

const contactInfo = [
  { icon: Mail, text: 'contact@wedesign.design' },
  { icon: Phone, text: '+1 (555) 123-4567' },
  { icon: MapPin, text: '123 Design Street, Creative City' },
]

'use client'

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-orange-500" />
              <span className="text-xl font-bold font-heading primary-gradient-text">
                Wedesign
              </span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Professional design services that transform brands and drive business growth. 
              We create memorable identities that stand out in today&apos;s competitive market.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <item.icon className="h-4 w-4" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-heading font-semibold text-lg">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground hover:primary-gradient-text transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-lg">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for design tips and exclusive offers.
              </p>
            </div>
            
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-64 px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <Button type="submit" variant="gradient" size="sm">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wedesign. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground hover:primary-gradient-text transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            
            <Link
              href="/admin"
              className="text-sm text-muted-foreground hover:text-foreground hover:primary-gradient-text transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}