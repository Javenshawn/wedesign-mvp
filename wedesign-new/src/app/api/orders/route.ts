import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// 初始化Supabase客户端（使用匿名密钥作为后备）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // 验证必要字段
    if (!orderData.projectName || !orderData.contactName || !orderData.selectedPlan) {
      return NextResponse.json(
        { error: '缺少必要字段: 项目名称、联系人姓名、套餐选择' },
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

    // 尝试插入到数据库
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderRecord])
        .select()

      if (error) {
        console.warn('Supabase插入警告（继续流程）:', error.message)
        // 即使数据库插入失败，也继续支付流程
      }

      // 返回成功响应（即使数据库失败也继续）
      return NextResponse.json({
        success: true,
        order_id: data?.[0]?.id || 'temp_' + Date.now(),
        message: '订单信息已接收，正在跳转支付...',
        database_saved: !error
      })

    } catch (dbError: any) {
      console.warn('数据库操作失败，继续支付流程:', dbError.message)
      // 即使数据库失败，也继续支付流程
      return NextResponse.json({
        success: true,
        order_id: 'temp_' + Date.now(),
        message: '订单信息已接收（数据库暂不可用），正在跳转支付...',
        database_saved: false
      })
    }

  } catch (error: any) {
    console.error('订单API错误:', error)
    return NextResponse.json(
      { error: '服务器错误', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')

    if (orderId) {
      // 获取单个订单
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      if (error) {
        return NextResponse.json(
          { error: '订单未找到' },
          { status: 404 }
        )
      }

      return NextResponse.json(data)
    } else {
      // 获取所有订单（分页）
      const page = parseInt(searchParams.get('page') || '1')
      const limit = parseInt(searchParams.get('limit') || '20')
      const offset = (page - 1) * limit

      const { data, error, count } = await supabase
        .from('orders')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        return NextResponse.json(
          { error: '获取订单失败' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        orders: data,
        pagination: {
          page,
          limit,
          total: count,
          total_pages: Math.ceil((count || 0) / limit)
        }
      })
    }
  } catch (error: any) {
    console.error('获取订单错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}