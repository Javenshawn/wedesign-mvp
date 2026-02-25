import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// 环境变量强制检查
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // 验证必要字段
    if (!orderData.projectName || !orderData.contactName || !orderData.selectedPlan) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 准备订单数据
    const orderRecord = {
      // 项目信息
      project_name: orderData.projectName,
      project_description: orderData.projectDescription,
      project_type: orderData.projectType,
      deadline: orderData.deadline,
      
      // 品牌信息
      company_name: orderData.companyName,
      industry: orderData.industry,
      target_audience: orderData.targetAudience,
      competitors: orderData.competitors,
      
      // 设计偏好
      design_style: orderData.designStyle,
      color_preferences: orderData.colorPreferences,
      inspiration_links: orderData.inspirationLinks,
      
      // 联系信息
      contact_name: orderData.contactName,
      email: orderData.email,
      phone: orderData.phone,
      wechat: orderData.wechat,
      
      // 订单信息
      selected_plan: orderData.selectedPlan,
      amount: orderData.amount || (orderData.selectedPlan === 'basic' ? 29900 : orderData.selectedPlan === 'professional' ? 59900 : 99900),
      currency: 'USD',
      status: 'pending',
      
      // 元数据
      metadata: {
        form_completed: true,
        steps_completed: 4,
        submitted_at: new Date().toISOString()
      }
    }

    // 插入到数据库
    const { data, error } = await supabase
      .from('orders')
      .insert([orderRecord])
      .select()

    if (error) {
      console.error('Supabase插入错误:', error.message)
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }

    // 返回成功响应
    return NextResponse.json({
      success: true,
      order_id: data[0].id
    })

  } catch (error: any) {
    console.error('订单API错误:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')

    if (!orderId) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // 获取单个订单（安全字段）
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        project_name,
        project_description,
        project_type,
        deadline,
        company_name,
        industry,
        target_audience,
        competitors,
        design_style,
        color_preferences,
        inspiration_links,
        contact_name,
        selected_plan,
        amount,
        currency,
        status,
        metadata,
        created_at
      `)
      .eq('id', orderId)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('获取订单错误:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}