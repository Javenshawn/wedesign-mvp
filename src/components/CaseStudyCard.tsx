'use client'

import { motion } from 'framer-motion'
import { Star, Award, CheckCircle, ExternalLink, Tag } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'

interface CaseStudyCardProps {
  caseData: {
    id: string
    client_name: string
    company: string
    industry: string
    project_type: string
    package: 'basic' | 'professional' | 'premium'
    amount: number
    description: string
    design_style: string
    color_palette: string
    deliverables: string[]
    testimonial?: string
    rating?: number
    is_featured: boolean
    tags: string[]
    image_url?: string
    project_url?: string
  }
  index?: number
}

export default function CaseStudyCard({ caseData, index = 0 }: CaseStudyCardProps) {
  const amountUSD = (caseData.amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })

  const packageColors = {
    basic: 'from-blue-500/20 to-blue-600/20 border-blue-200 text-blue-700',
    professional: 'from-purple-500/20 to-purple-600/20 border-purple-200 text-purple-700',
    premium: 'from-orange-500/20 to-orange-600/20 border-orange-200 text-orange-700'
  }

  const packageLabels = {
    basic: 'Basic Plan',
    professional: 'Professional Plan',
    premium: 'Premium Plan'
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: index * 0.1 }
  }

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
    >
      <Card 
        hoverEffect 
        gradient={caseData.is_featured}
        className={cn(
          "h-full border-2",
          caseData.is_featured && "border-primary/30 shadow-xl"
        )}
      >
        {/* Featured Badge */}
        {caseData.is_featured && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <Badge variant="default" className="px-4 py-1.5 font-bold shadow-lg">
              <Award className="h-4 w-4 mr-1" />
              FEATURED CASE
            </Badge>
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-heading mb-1">
                {caseData.company}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{caseData.industry}</p>
            </div>
            
            <Badge 
              variant="outline" 
              className={cn(
                "font-bold",
                packageColors[caseData.package].split(' ')[0]
              )}
            >
              {packageLabels[caseData.package]}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Project Overview */}
          <div>
            <h4 className="font-bold text-lg mb-2 primary-gradient-text">
              {caseData.project_type}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {caseData.description}
            </p>
          </div>

          {/* Design Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground">Design Style</div>
              <div className="font-medium">{caseData.design_style}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs font-medium text-muted-foreground">Color Palette</div>
              <div className="font-medium">{caseData.color_palette}</div>
            </div>
          </div>

          {/* Price */}
          <div className="text-center p-4 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10">
            <div className="text-3xl font-bold primary-gradient-text mb-1">
              {amountUSD}
            </div>
            <div className="text-sm text-muted-foreground">
              Investment • {caseData.package.charAt(0).toUpperCase() + caseData.package.slice(1)} Package
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <h5 className="font-bold">Deliverables</h5>
            </div>
            <div className="flex flex-wrap gap-2">
              {caseData.deliverables.slice(0, 4).map((item, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary"
                  className="text-xs"
                >
                  {item}
                </Badge>
              ))}
              {caseData.deliverables.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{caseData.deliverables.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Testimonial */}
          {caseData.testimonial && (
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {caseData.client_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-bold">{caseData.client_name}</div>
                  <div className="text-sm text-muted-foreground">{caseData.company}</div>
                </div>
                {caseData.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{caseData.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-sm italic text-foreground/80">
                &ldquo;{caseData.testimonial}&rdquo;
              </p>
            </div>
          )}

          {/* Tags */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm font-medium text-muted-foreground">Tags</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {caseData.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Button 
            variant="outline" 
            className="w-full group"
            asChild
          >
            <a 
              href={`/cases/${caseData.id}`}
              className="flex items-center justify-center"
            >
              View Full Case Study
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}