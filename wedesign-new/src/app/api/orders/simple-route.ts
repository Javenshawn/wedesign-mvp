import { NextRequest, NextResponse } from 'next/server'

// 简化版本，不依赖环境变量
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

    // 模拟成功响应
    const mockOrderId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return NextResponse.json({
      success: true,
      order_id: mockOrderId
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

    // 返回模拟订单数据
    return NextResponse.json({
      id: orderId,
      project_name: "Test Project",
      contact_name: "Test User",
      selected_plan: "basic",
      status: "pending",
      created_at: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('获取订单错误:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}