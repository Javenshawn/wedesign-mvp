import { NextRequest, NextResponse } from 'next/server'

// 价格映射（单位：分）
const PRICE_MAP: Record<string, number> = {
  basic: 29900,    // $299.00
  standard: 59900, // $599.00
  premium: 99900,  // $999.00
}

// 产品名称映射
const PRODUCT_NAME_MAP: Record<string, string> = {
  basic: 'Wedesign Basic Package',
  standard: 'Wedesign Standard Package',
  premium: 'Wedesign Premium Package',
}

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json()
    
    if (!plan || !PRICE_MAP[plan]) {
      return NextResponse.json(
        { error: 'Invalid plan selection' },
        { status: 400 }
      )
    }

    // 这里需要师傅提供Stripe密钥和price_id
    // 暂时返回模拟数据
    const mockCheckoutUrl = `https://checkout.stripe.com/pay/test_${plan}`
    
    return NextResponse.json({
      url: mockCheckoutUrl,
      plan,
      amount: PRICE_MAP[plan],
      message: 'Checkout session created (mock)'
    })

  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}