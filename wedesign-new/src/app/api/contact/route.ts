import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, project, plan } = body

    // Basic validation
    if (!name || !email || !project) {
      return NextResponse.json(
        { error: 'Name, email, and project details are required' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Save to database (Supabase)
    // 2. Send email notification
    // 3. Add to CRM
    
    console.log('Contact form submission:', {
      name,
      email,
      company: company || 'Not provided',
      project,
      plan: plan || 'Not selected',
      timestamp: new Date().toISOString()
    })

    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Thank you for your submission! We will get back to you within 24 hours.',
      data: {
        name,
        email,
        company,
        project,
        plan
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}