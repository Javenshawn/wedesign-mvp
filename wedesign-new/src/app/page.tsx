"use client"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Separator } from "@/components/ui/Separator"
import { Badge } from "@/components/ui/Badge"

export default function HomePage() {
  const handleCheckout = async (plan: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: plan,
          email: 'customer@example.com'
        }),
      })
      
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      project: formData.get('project') as string,
      plan: formData.get('plan') as string
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (response.ok) {
        alert(result.message || 'Thank you for your submission! We will get back to you within 24 hours.')
        form.reset()
      } else {
        alert(result.error || 'Failed to submit form. Please try again.')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Failed to submit form. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <Badge variant="outline" className="text-sm">
                  Professional Design Services
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  Transform Your Brand with
                  <span className="block text-blue-600">Expert Design</span>
                </h1>
                <p className="text-lg text-gray-600 md:text-xl">
                  We create stunning logos and brand identities that help businesses stand out and attract customers.
                  Professional design services with fast delivery and satisfaction guarantee.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handleCheckout('professional')}
                >
                  Start Your Project
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  View Case Studies
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-600">3-7 Day Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-600">Unlimited Revisions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-600">Money-Back Guarantee</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl bg-gradient-to-br from-blue-100 to-white p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">W</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Most Popular</Badge>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Professional Logo Design</h3>
                    <p className="text-gray-600 mt-2">Complete brand identity package with unlimited revisions</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">3 Logo Concepts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">Unlimited Revisions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">All Source Files</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">Brand Guidelines</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="text-3xl font-bold text-gray-900">$599</div>
                    <p className="text-gray-500 text-sm">One-time payment</p>
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleCheckout('professional')}
                  >
                    Choose Professional
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50" id="pricing">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the perfect plan for your design needs. All plans include source files and commercial rights.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Basic Plan */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Perfect for startups and small businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">$299</div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>1 Logo Concept</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>2 Revisions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>3-5 Day Delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Source Files</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleCheckout('basic')}
                >
                  Choose Basic
                </Button>
              </CardFooter>
            </Card>

            {/* Professional Plan */}
            <Card className="border-blue-200 bg-gradient-to-b from-blue-50 to-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <CardDescription>Complete brand identity package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">$599</div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>3 Logo Concepts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Unlimited Revisions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>5-7 Day Delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>All Source Files</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Brand Guidelines</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => handleCheckout('professional')}
                >
                  Choose Professional
                </Button>
              </CardFooter>
            </Card>

            {/* Premium Plan */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <CardDescription>Full brand identity system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">$999</div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Complete Brand Identity</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Unlimited Revisions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>7-10 Day Delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>All Source Files</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Stationery Design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Social Media Kit</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleCheckout('premium')}
                >
                  Choose Premium
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Get Started Today
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Tell us about your project and we'll get back to you within 24 hours.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" placeholder="John Smith" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name (Optional)</Label>
                    <Input id="company" name="company" placeholder="Your Company" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">Project Details</Label>
                    <Textarea 
                      id="project" 
                      name="project"
                      placeholder="Tell us about your design needs, timeline, and budget..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan">Preferred Plan</Label>
                    <select 
                      id="plan"
                      name="plan"
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="">Select a plan</option>
                      <option value="basic">Basic - $299</option>
                      <option value="professional">Professional - $599</option>
                      <option value="premium">Premium - $999</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Send Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}