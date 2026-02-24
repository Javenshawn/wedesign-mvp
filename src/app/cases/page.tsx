'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Award, TrendingUp, Globe, Users } from 'lucide-react'
import CaseStudyCard from '@/components/CaseStudyCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'

// Mock data - in production this would come from Supabase
const mockCases = [
  {
    id: '1',
    client_name: 'Alex Johnson',
    company: 'TechStart Inc.',
    industry: 'SaaS / Technology',
    project_type: 'Complete Brand Identity Design',
    package: 'premium' as const,
    amount: 99900,
    description: 'Complete brand identity design for a technology startup specializing in SaaS solutions. The project included logo design, color palette, typography system, and full brand guidelines.',
    design_style: 'Modern, Clean, Professional',
    color_palette: 'Blue tones, Gradient effects, White space',
    deliverables: ['Logo Design', 'Color Palette', 'Typography System', 'Brand Guidelines', 'Social Media Kit', 'Business Cards', 'Email Signature', 'Presentation Template'],
    testimonial: 'The Wedesign team delivered exceptional work that perfectly captured our brand vision. The process was smooth and the final result exceeded our expectations. Highly recommended!',
    rating: 5,
    is_featured: true,
    tags: ['branding', 'logo-design', 'saas', 'technology', 'premium'],
    image_url: '/cases/techstart.jpg',
    project_url: 'https://techstart.com'
  },
  {
    id: '2',
    client_name: 'Sarah Chen',
    company: 'GreenLeaf Organics',
    industry: 'Health & Wellness',
    project_type: 'Logo & Packaging Design',
    package: 'professional' as const,
    amount: 59900,
    description: 'Logo design and packaging system for an organic health food company. Focus on natural, earthy aesthetics that communicate purity and quality.',
    design_style: 'Organic, Natural, Minimalist',
    color_palette: 'Green tones, Earth colors, Natural textures',
    deliverables: ['Logo Design', 'Packaging Design', 'Label System', 'Brand Colors'],
    testimonial: 'The design perfectly represents our commitment to natural, organic products. Sales increased by 30% after rebranding!',
    rating: 5,
    is_featured: true,
    tags: ['packaging', 'organic', 'health', 'food', 'professional'],
    image_url: '/cases/greenleaf.jpg',
    project_url: 'https://greenleaforganics.com'
  },
  {
    id: '3',
    client_name: 'Michael Rodriguez',
    company: 'FinTech Solutions',
    industry: 'Finance / FinTech',
    project_type: 'Corporate Identity',
    package: 'basic' as const,
    amount: 29900,
    description: 'Corporate identity design for a financial technology startup. Clean, trustworthy design that communicates security and innovation.',
    design_style: 'Corporate, Trustworthy, Innovative',
    color_palette: 'Blue, Gray, White, Accent colors',
    deliverables: ['Logo Design', 'Business Cards', 'Email Signature', 'Document Template'],
    testimonial: 'Professional service with excellent attention to detail. Our new identity has been well received by investors and clients alike.',
    rating: 4,
    is_featured: false,
    tags: ['corporate', 'finance', 'startup', 'basic'],
    image_url: '/cases/fintech.jpg',
    project_url: 'https://fintechsolutions.com'
  },
  {
    id: '4',
    client_name: 'Emma Wilson',
    company: 'Creative Lab Studios',
    industry: 'Creative Agency',
    project_type: 'Website & UI/UX Design',
    package: 'professional' as const,
    amount: 59900,
    description: 'Complete website redesign with modern UI/UX for a creative agency. Focus on portfolio showcase and client acquisition.',
    design_style: 'Creative, Bold, Interactive',
    color_palette: 'Vibrant colors, Dark mode, Animations',
    deliverables: ['Website Design', 'UI/UX Design', 'Mobile Responsive', 'CMS Integration'],
    testimonial: 'The new website has doubled our lead generation. The design is both beautiful and functional.',
    rating: 5,
    is_featured: true,
    tags: ['web-design', 'ui-ux', 'creative', 'agency', 'professional'],
    image_url: '/cases/creative-lab.jpg',
    project_url: 'https://creativelabstudios.com'
  },
  {
    id: '5',
    client_name: 'David Kim',
    company: 'Urban Fitness',
    industry: 'Fitness & Wellness',
    project_type: 'Brand Identity & Marketing',
    package: 'premium' as const,
    amount: 99900,
    description: 'Complete brand identity and marketing materials for a premium fitness studio chain. Modern, energetic design that appeals to urban professionals.',
    design_style: 'Energetic, Modern, Premium',
    color_palette: 'Black, Gold, Neon accents',
    deliverables: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Social Media Kit', 'Apparel Design', 'Signage'],
    testimonial: 'Outstanding work that perfectly captures our brand ethos. Membership signups increased by 45% after launch.',
    rating: 5,
    is_featured: false,
    tags: ['fitness', 'premium', 'marketing', 'branding'],
    image_url: '/cases/urban-fitness.jpg',
    project_url: 'https://urbanfitness.com'
  },
  {
    id: '6',
    client_name: 'Lisa Thompson',
    company: 'EcoPack Solutions',
    industry: 'Sustainable Packaging',
    project_type: 'Packaging System Design',
    package: 'basic' as const,
    amount: 29900,
    description: 'Sustainable packaging design system for an eco-friendly packaging company. Focus on recyclable materials and clear messaging.',
    design_style: 'Sustainable, Clean, Informative',
    color_palette: 'Green, Brown, Natural tones',
    deliverables: ['Packaging Design', 'Label System', 'Brand Guidelines', 'Product Photography'],
    testimonial: 'The designs not only look great but effectively communicate our sustainability mission. Highly recommended for eco-conscious brands.',
    rating: 4,
    is_featured: false,
    tags: ['packaging', 'sustainable', 'eco-friendly', 'basic'],
    image_url: '/cases/ecopack.jpg',
    project_url: 'https://ecopacksolutions.com'
  }
]

const filters = [
  { id: 'all', label: 'All Cases' },
  { id: 'featured', label: 'Featured' },
  { id: 'premium', label: 'Premium' },
  { id: 'professional', label: 'Professional' },
  { id: 'basic', label: 'Basic' },
  { id: 'branding', label: 'Branding' },
  { id: 'web-design', label: 'Web Design' },
  { id: 'packaging', label: 'Packaging' }
]

const stats = [
  { icon: Award, value: '200+', label: 'Satisfied Clients' },
  { icon: TrendingUp, value: '98%', label: 'Success Rate' },
  { icon: Globe, value: '15+', label: 'Countries Served' },
  { icon: Users, value: '500+', label: 'Projects Completed' }
]

export default function CasesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredCases = useMemo(() => {
    return mockCases.filter(caseItem => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        caseItem.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.project_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesFilter = activeFilter === 'all' || 
        (activeFilter === 'featured' && caseItem.is_featured) ||
        (activeFilter === 'premium' && caseItem.package === 'premium') ||
        (activeFilter === 'professional' && caseItem.package === 'professional') ||
        (activeFilter === 'basic' && caseItem.package === 'basic') ||
        caseItem.tags.includes(activeFilter)

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, activeFilter])

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/5 via-transparent to-transparent rounded-full translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="default" className="mb-6 px-4 py-1.5">
                <Award className="h-4 w-4 mr-1" />
                Portfolio Showcase
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Our <span className="primary-gradient-text">Design Portfolio</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Explore real projects that showcase our design expertise and client success stories.
              Each case study demonstrates our commitment to quality and results.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeInUp}>
              <Card className="max-w-4xl mx-auto border-primary/20 bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 mx-auto">
                          <stat.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="text-3xl font-bold primary-gradient-text mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-card/50 backdrop-blur-sm sticky top-16 z-40 border-y">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search cases by company, industry, or tags..."
                  className="pl-10 w-full md:w-96"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                  className={activeFilter === filter.id ? "primary-gradient-bg border-transparent" : ""}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold font-heading">
                {activeFilter === 'all' ? 'All Case Studies' : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Cases`}
              </h2>
              <p className="text-muted-foreground">
                Showing {filteredCases.length} of {mockCases.length} cases
              </p>
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Sort By: Featured
            </Button>
          </div>

          {filteredCases.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2">No cases found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setActiveFilter('all')
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCases.map((caseItem, index) => (
                <CaseStudyCard 
                  key={caseItem.id} 
                  caseData={caseItem} 
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="max-w-4xl mx-auto border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Let&apos;s create something amazing together. Our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg" asChild>
                  <a href="/#pricing">
                    View Pricing & Plans
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:contact@wedesign.design">
                    Schedule Consultation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}