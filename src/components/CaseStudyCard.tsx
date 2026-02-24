interface CaseStudyCardProps {
  caseData: {
    id: string
    client_name: string
    company: string
    industry: string
    project_type: string
    package: string
    amount: number
    description: string
    design_style: string
    color_palette: string
    deliverables: string[]
    testimonial?: string
    rating?: number
    is_featured: boolean
    tags: string[]
  }
}

export default function CaseStudyCard({ caseData }: CaseStudyCardProps) {
  const amountUSD = (caseData.amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden border ${caseData.is_featured ? 'border-2 border-blue-500' : 'border-gray-200'}`}>
      {/* Featured Badge */}
      {caseData.is_featured && (
        <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1">
          FEATURED CASE
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{caseData.company}</h3>
              <p className="text-gray-600">{caseData.industry}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{amountUSD}</div>
              <div className="text-sm text-gray-500">{caseData.package} Package</div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Project: {caseData.project_type}</h4>
          <p className="text-gray-600 text-sm mb-3">{caseData.description}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium text-gray-700">Style:</span>
              <span className="text-gray-600 ml-2">{caseData.design_style}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Colors:</span>
              <span className="text-gray-600 ml-2">{caseData.color_palette}</span>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Deliverables</h4>
          <div className="flex flex-wrap gap-2">
            {caseData.deliverables.slice(0, 4).map((item, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
              >
                {item}
              </span>
            ))}
            {caseData.deliverables.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{caseData.deliverables.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Testimonial */}
        {caseData.testimonial && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {caseData.client_name.charAt(0)}
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-900">{caseData.client_name}</div>
                <div className="text-sm text-gray-600">{caseData.company}</div>
              </div>
              {caseData.rating && (
                <div className="ml-auto flex items-center">
                  <div className="text-yellow-500 mr-1">★</div>
                  <span className="font-medium">{caseData.rating}/5</span>
                </div>
              )}
            </div>
            <p className="text-gray-700 italic text-sm">"{caseData.testimonial}"</p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {caseData.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Completed</span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View Full Case Study →
          </button>
        </div>
      </div>
    </div>
  )
}