import { createClient } from '@supabase/supabase-js'

// 从环境变量获取配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 验证环境变量
if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// 创建Supabase客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})

// 订单相关操作
export interface Order {
  id: string
  email: string
  stripe_session_id: string
  plan: string
  amount: number
  status: string
  created_at: string
}

// 创建订单
export async function createOrder(orderData: Omit<Order, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single()

    if (error) {
      console.error('Error creating order:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to create order:', error)
    throw error
  }
}

// 根据session_id获取订单
export async function getOrderBySessionId(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single()

    if (error) {
      console.error('Error fetching order:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Failed to fetch order:', error)
    return null
  }
}

// 获取所有订单（管理员用）
export async function getAllOrders(limit = 100) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching orders:', error)
      return []
    }

    return data
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return []
  }
}

// 更新订单状态
export async function updateOrderStatus(sessionId: string, status: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('stripe_session_id', sessionId)
      .select()
      .single()

    if (error) {
      console.error('Error updating order:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to update order:', error)
    throw error
  }
}