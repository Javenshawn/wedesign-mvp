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
    description: 'Complete brand identity design for a technology startup specializing in SaaS solutions.',
    design_style: 'Modern, Clean, Professional',
    color_palette: 'Blue tones, Gradient effects',
    deliverables: ['Logo Design', 'Color Palette', 'Typography System', 'Brand Guidelines'],
    testimonial: 'The Wedesign team delivered exceptional work that perfectly captured our brand vision.',
    rating: 5,
    is_featured: true,
    tags: ['branding', 'logo-design', 'saas', 'technology']
  },
  {
    id: '2',
    client_name: 'GreenLeaf Organics',
    company: 'GreenLeaf Organics',
    industry: 'Health & Wellness',
    project_type: 'Logo & Packaging Design',
    package: 'Professional',
    amount: 59900,
    description: 'Logo design and packaging system for an organic health food company.',
    design_style: 'Organic, Natural, Minimalist',
    color_palette: 'Green tones, Earth colors',
    deliverables: ['Logo Design', 'Packaging Design', 'Label System'],
    testimonial: 'The design perfectly represents our commitment to natural, organic products.',
    rating: 5,
    is_featured: true,
    tags: ['packaging', 'organic', 'health', 'food']
  },
  {
    id: '3',
    client_name: 'FinTech Solutions',
    company: 'FinTech Solutions',
    industry: 'Finance / FinTech',
    project_type: 'Corporate Identity',
    package: 'Basic',
    amount: 29900,
    description: 'Corporate identity design for a financial technology startup.',
    design_style: 'Corporate, Trustworthy, Innovative',
    color_palette: 'Blue, Gray, White',
    deliverables: ['Logo Design', 'Business Cards', 'Email Signature'],
    testimonial: 'Professional service with excellent attention to detail.',
    rating: 4,
    is_featured: false,
    tags: ['corporate', 'finance', 'startup']
  },
  {
    id: '4',
    client_name: 'Creative Lab Studios',
    company: 'Creative Lab Studios',
    industry: 'Creative Agency',
    project_type: 'Website & UI/UX Design',
    package: 'Professional',
    amount: 59900,
    description: 'Complete website redesign with modern UI/UX for a creative agency.',
    design_style: 'Creative, Bold, Interactive',
    color_palette: 'Vibrant colors, Dark mode',
    deliverables: ['Website Design', 'UI/UX Design', 'Mobile Responsive'],
    testimonial: 'The new website has doubled our lead generation.',
    rating: 5,
    is_featured: true,
    tags: ['web-design', 'ui-ux', 'creative', 'agency']
  },
  {
    id: '5',
    client_name: 'Urban Fitness',
    company: 'Urban Fitness',
    industry: 'Fitness & Wellness',
    project_type: 'Brand Identity & Marketing',
    package: 'Premium',
    amount: 99900,
    description: 'Complete brand identity and marketing materials for a premium fitness studio.',
    design_style: 'Energetic, Modern, Premium',
    color_palette: 'Black, Gold, Neon accents',
    deliverables: ['Logo Design', 'Brand Guidelines', 'Marketing Materials'],
    testimonial: 'Outstanding work that perfectly captures our brand ethos.',
    rating: 5,
    is_featured: false,
    tags: ['fitness', 'premium', 'marketing']
  },
  {
    id: '6',
    client_name: 'EcoPack Solutions',
    company: 'EcoPack Solutions',
    industry: 'Sustainable Packaging',
    project_type: 'Packaging System Design',
    package: 'Basic',
    amount: 29900,
    description: 'Sustainable packaging design system for an eco-friendly packaging company.',
    design_style: 'Sustainable, Clean, Informative',
    color_palette: 'Green, Brown, Natural tones',
    deliverables: ['Packaging Design', 'Label System', 'Brand Guidelines'],
    testimonial: 'The designs effectively communicate our sustainability mission.',
    rating: 4,
    is_featured: false,
    tags: ['packaging', 'sustainable', 'eco-friendly']
  }
]

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full mb-6">
            <span className="font-bold">📊 REAL RESULTS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See How We Help Businesses
            <br />
            <span className="text-blue-600">Grow with Design</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real projects, real results. See how our designs have helped businesses increase sales and attract customers.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-700">Satisfied Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-700">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-700">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700">Projects Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Case Studies</h2>
            <p className="text-gray-600">Showing {mockCases.length} real projects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCases.map((caseItem) => (
              <CaseStudyCard key={caseItem.id} caseData={caseItem} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Our team is ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/#pricing" 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              View Pricing & Plans
            </a>
            <a 
              href="mailto:contact@wedesign.design" 
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}