'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const createCasesTable = async () => {
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      // 首先检查cases表是否存在
      const { data: checkData, error: checkError } = await supabase
        .from('cases')
        .select('count')
        .limit(1)
      
      if (!checkError) {
        setMessage('✅ Cases table already exists')
        setLoading(false)
        return
      }
      
      // 表不存在，尝试通过RPC创建
      setMessage('Creating cases table...')
      
      // 由于无法直接执行SQL，我们将尝试插入数据来隐式创建表
      // 首先尝试插入测试数据
      const testCase = {
        client_name: 'Test Client',
        client_email: 'test@example.com',
        company: 'Test Company',
        industry: 'Test Industry',
        project_type: 'Test Project',
        package: 'Basic',
        amount: 29900,
        description: 'Test description',
        design_style: 'Test style',
        color_palette: 'Test colors',
        deliverables: ['Test deliverable'],
        status: 'completed'
      }
      
      const { data, error: insertError } = await supabase
        .from('cases')
        .insert(testCase)
        .select()
      
      if (insertError) {
        // 表可能不存在，需要手动创建
        setError(`Table creation failed. Please run SQL manually in Supabase SQL Editor. Error: ${insertError.message}`)
        setMessage('')
      } else {
        // 删除测试数据
        await supabase
          .from('cases')
          .delete()
          .eq('id', data[0].id)
        
        setMessage('✅ Cases table created successfully!')
      }
      
    } catch (err: any) {
      setError(`Failed to create table: ${err.message}`)
      setMessage('')
    } finally {
      setLoading(false)
    }
  }

  const insertSampleData = async () => {
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      const sampleCases = [
        {
          client_name: 'TechStart Inc.',
          client_email: 'alex.johnson@techstart.com',
          company: 'TechStart Inc.',
          industry: 'SaaS / Technology',
          project_type: 'Complete Brand Identity Design',
          package: 'Premium',
          amount: 99900,
          timeline: '2-3 weeks',
          status: 'completed',
          description: 'Complete brand identity design for a technology startup specializing in SaaS solutions. The project included logo design, color palette, typography system, and full brand guidelines.',
          design_style: 'Modern, Clean, Professional',
          color_palette: 'Blue tones, Gradient effects, White space',
          deliverables: ['Logo Design', 'Color Palette', 'Typography System', 'Brand Guidelines', 'Social Media Kit', 'Business Cards', 'Email Signature', 'Presentation Template'],
          testimonial: 'The Wedesign team delivered exceptional work that perfectly captured our brand vision. The process was smooth and the final result exceeded our expectations. Highly recommended!',
          rating: 5,
          reference_image: '微信图片_20201028145905.jpg',
          order_id: 'cs_test_' + Math.floor(Math.random() * 1000000),
          is_featured: true,
          tags: ['branding', 'logo-design', 'saas', 'technology', 'premium']
        },
        {
          client_name: 'GreenLeaf Organics',
          client_email: 'sarah@greenleaforganics.com',
          company: 'GreenLeaf Organics',
          industry: 'Health & Wellness',
          project_type: 'Logo & Packaging Design',
          package: 'Professional',
          amount: 59900,
          timeline: '1-2 weeks',
          status: 'completed',
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
          client_name: 'FinTech Solutions',
          client_email: 'michael@fintechsolutions.io',
          company: 'FinTech Solutions',
          industry: 'Finance / FinTech',
          project_type: 'Corporate Identity',
          package: 'Basic',
          amount: 29900,
          timeline: '3-5 days',
          status: 'completed',
          description: 'Corporate identity design for a financial technology startup. Clean, trustworthy design that communicates security and innovation.',
          design_style: 'Corporate, Trustworthy, Innovative',
          color_palette: 'Blue, Gray, White, Accent colors',
          deliverables: ['Logo Design', 'Business Cards', 'Email Signature', 'Document Template'],
          testimonial: 'Fast delivery and professional results. Exactly what we needed for our investor pitch.',
          rating: 4,
          is_featured: false,
          tags: ['corporate', 'fintech', 'finance', 'basic']
        }
      ]
      
      setMessage('Inserting sample cases...')
      
      const { data, error } = await supabase
        .from('cases')
        .insert(sampleCases)
        .select()
      
      if (error) {
        setError(`Failed to insert sample data: ${error.message}`)
        setMessage('')
      } else {
        setMessage(`✅ Successfully inserted ${data.length} sample cases!`)
      }
      
    } catch (err: any) {
      setError(`Failed to insert sample data: ${err.message}`)
      setMessage('')
    } finally {
      setLoading(false)
    }
  }

  const checkCasesTable = async () => {
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('count')
        .limit(1)
      
      if (error) {
        setError(`Cases table does not exist or cannot be accessed: ${error.message}`)
      } else {
        const { count } = await supabase
          .from('cases')
          .select('*', { count: 'exact', head: true })
        
        setMessage(`✅ Cases table exists with ${count || 0} records`)
      }
      
    } catch (err: any) {
      setError(`Error checking table: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Setup</h1>
        
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Success Cases Database</h2>
          <p className="text-gray-600 mb-6">
            Set up the success cases database for showcasing completed projects.
          </p>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={checkCasesTable}
                disabled={loading}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition disabled:opacity-50 font-medium"
              >
                Check Table Status
              </button>
              
              <button
                onClick={createCasesTable}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
              >
                Create Cases Table
              </button>
              
              <button
                onClick={insertSampleData}
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-medium"
              >
                Insert Sample Data
              </button>
            </div>
            
            {loading && (
              <div className="flex items-center text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Processing...
              </div>
            )}
            
            {message && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-800">{message}</div>
              </div>
            )}
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-red-800 font-medium mb-2">Error:</div>
                <div className="text-red-700">{error}</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-3">Manual Setup Instructions</h3>
          <p className="text-yellow-800 mb-4">
            If automatic setup fails, please follow these manual steps:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-yellow-800 font-bold">1</span>
              </div>
              <div>
                <div className="font-medium text-yellow-900">Go to Supabase Dashboard</div>
                <div className="text-yellow-700 text-sm">
                  Visit: <a href="https://supabase.com/dashboard/project/ludcfjcmzyefsirmserg" target="_blank" rel="noopener noreferrer" className="underline">https://supabase.com/dashboard/project/ludcfjcmzyefsirmserg</a>
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-yellow-800 font-bold">2</span>
              </div>
              <div>
                <div className="font-medium text-yellow-900">Open SQL Editor</div>
                <div className="text-yellow-700 text-sm">
                  Click "SQL Editor" in the left sidebar
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-yellow-800 font-bold">3</span>
              </div>
              <div>
                <div className="font-medium text-yellow-900">Paste and Run SQL</div>
                <div className="text-yellow-700 text-sm">
                  Copy the SQL from <code className="bg-yellow-100 px-2 py-1 rounded">supabase-cases-table.sql</code> and execute it
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-yellow-800 font-bold">4</span>
              </div>
              <div>
                <div className="font-medium text-yellow-900">Verify Results</div>
                <div className="text-yellow-700 text-sm">
                  Check that 3 sample cases are inserted successfully
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <a 
              href="/cases" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              View Cases Page →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}