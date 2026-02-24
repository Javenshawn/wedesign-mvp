import { NextRequest, NextResponse } from 'next/server'

// 简化版本，避免构建错误
export async function POST(request: NextRequest) {
  try {
    // 记录请求
    console.log('Webhook received (simplified version)')
    
    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: 'Webhook endpoint is running (simplified)',
      environment: process.env.NODE_ENV
    })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed', details: error.message },
      { status: 500 }
    )
  }
}

// GET方法用于测试
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Stripe Webhook endpoint (simplified)',
    status: 'running',
    environment: process.env.NODE_ENV
  })
}