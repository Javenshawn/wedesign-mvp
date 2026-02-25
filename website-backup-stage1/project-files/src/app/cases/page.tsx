import CaseStudyCard from '@/components/CaseStudyCard'

// Mock data - in production this would come from Supabase
const mockCases = [
  {
    id: '1',
    client_name: 'TechStart Inc.',
    company: 'TechStart Inc.',
    industry: 'SaaS / Technology',
    project_type: 'Complete Brand Identity Design',
    package: 'Premium',
    amount: 99900,
    description: 'Complete brand identity design for a technology startup specializing in SaaS solutions. The project included logo design, color palette, typography system, and full brand guidelines.',
    design_style: 'Modern, Clean, Professional',
    color_palette: 'Blue tones, Gradient effects, White space',
    deliverables: ['Logo Design', 'Color Palette', 'Typography System', 'Brand Guidelines', 'Social Media Kit', 'Business Cards', 'Email Signature', 'Presentation Template'],
    testimonial: 'The Wedesign team delivered exceptional work that perfectly captured our brand vision. The process was smooth and the final result exceeded our expectations. Highly recommended!',
    rating: 5,
    is_featured: true,
    tags: ['branding', 'logo-design', 'saas', 'technology', 'premium']
  },
  {
    id: '2',
    client_name: 'GreenLeaf Organics',
    company: 'GreenLeaf Organics',
    industry: 'Health & Wellness',
    project_type: 'Logo & Packaging Design',
    package: 'Professional',
    amount: 59900,
    description: 'Logo design and packaging system for an organic health food company. Focus on natural, earthy aesthetics that communicate purity and quality.',
    design_style: 'Organic, Natural, Minimalist',
    color_palette: 'Green tones, Earth colors, Natural textures',
    deliverables: ['Logo Design', 'Packaging Design', 'Label System', 'Brand Colors'],
    testimonial: 'The design perfectly represents our commitment to natural, organic products. Sales increased by 30% after rebranding!',
    rating: 5,
    is_featured: true,
    tags: ['packaging', 'organic', 'health', 'food', 'professional']
  },
  {
    id: '3',
    client_name: 'FinTech Solutions',
    company: 'FinTech Solutions',
    industry: 'Finance / FinTech',
    project_type: 'Corporate Identity',
    package: 'Basic',
    amount: 29900,
    description: 'Corporate identity design for a financial technology startup. Clean, trustworthy design that communicates security and innovation.',
    design_style: 'Corporate, Trustworthy, Innovative',
    color_palette: 'Blue, Gray, White, Accent colors',
    deliverables: ['Logo Design', 'Business Cards', 'Email Signature', 'Document Template'],
    testimonial: 'Fast delivery and professional results. Exactly what we needed for our investor pitch.',
    rating: 4,
    is_featured: false,
    tags: ['corporate', 'fintech', 'finance', 'basic']
  },
  {
    id: '4',
    client_name: 'Creative Studio',
    company: 'Creative Studio',
    industry: 'Creative Agency',
    project_type: 'Website Redesign',
    package: 'Professional',
    amount: 59900,
    description: 'Complete website redesign with modern UI/UX principles. Focus on portfolio presentation and client conversion.',
    design_style: 'Creative, Bold, Interactive',
    color_palette: 'Dark theme, Neon accents, Gradients',
    deliverables: ['Website Design', 'UI/UX', 'Mobile Responsive', 'CMS Integration'],
    testimonial: 'Our website traffic increased by 150% and client inquiries tripled. Amazing work!',
    rating: 5,
    is_featured: false,
    tags: ['web-design', 'ui-ux', 'creative', 'portfolio']
  },
  {
    id: '5',
    client_name: 'Local Restaurant',
    company: 'Bella Vista Restaurant',
    industry: 'Food & Beverage',
    project_type: 'Menu & Branding',
    package: 'Basic',
    amount: 29900,
    description: 'Complete restaurant branding including menu design, logo, and promotional materials.',
    design_style: 'Elegant, Traditional, Warm',
    color_palette: 'Gold, Burgundy, Cream',
    deliverables: ['Logo Design', 'Menu Design', 'Business Cards', 'Social Media Graphics'],
    testimonial: 'Customers love the new look! Our brand now truly reflects the quality of our food.',
    rating: 4,
    is_featured: false,
    tags: ['restaurant', 'menu-design', 'hospitality', 'basic']
  },
  {
    id: '6',
    client_name: 'Fitness App',
    company: 'FitTrack Pro',
    industry: 'Health & Fitness Tech',
    project_type: 'App UI/UX Design',
    package: 'Premium',
    amount: 99900,
    description: 'Complete mobile app UI/UX design for a fitness tracking application. Focus on user engagement and retention.',
    design_style: 'Modern, Energetic, User-friendly',
    color_palette: 'Orange, Black, White, Gradients',
    deliverables: ['App UI Design', 'UX Research', 'Prototype', 'Design System', 'Icon Set'],
    testimonial: 'The design significantly improved user retention. Our app ratings went from 3.8 to 4.7 stars!',
    rating: 5,
    is_featured: true,
    tags: ['app-design', 'ui-ux', 'fitness', 'mobile', 'premium']
  }
]

export default function CasesPage() {
  const featuredCases = mockCases.filter(caseData => caseData.is_featured)
  const otherCases = mockCases.filter(caseData => !caseData.is_featured)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Success Stories</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              See how we've helped businesses transform their brands with professional design.
              Real projects, real results.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">$500K+</div>
              <div className="text-gray-600">Revenue Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Case Studies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most impactful projects that demonstrate the power of great design.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredCases.map((caseData) => (
              <CaseStudyCard key={caseData.id} caseData={caseData} />
            ))}
          </div>

          {/* All Cases */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Projects</h2>
            <p className="text-gray-600">Browse our complete portfolio of successful design projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherCases.map((caseData) => (
              <CaseStudyCard key={caseData.id} caseData={caseData} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our satisfied clients and transform your brand today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition"
            >
              View Pricing Plans
            </a>
            <a
              href="https://calendly.com/wedesign/consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
            >
              Book Free Consultation
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}