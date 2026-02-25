import Stripe from 'stripe';
import { STRIPE_CONFIG, validateStripeConfig } from '../config/stripe.js';

// 初始化Stripe
let stripe;
try {
  validateStripeConfig();
  stripe = new Stripe(STRIPE_CONFIG.SECRET_KEY);
} catch (error) {
  console.warn('Stripe配置不完整，Webhook将在模拟模式下运行:', error.message);
  stripe = null;
}

// 订单处理函数（模拟）
async function simulateOrderProcessing(session) {
  console.log('🔧 模拟订单处理:', session.id);
  
  const order = {
    orderId: `SIM${Date.now()}`,
    sessionId: session.id,
    planId: session.metadata?.planId || 'unknown',
    companyName: session.metadata?.companyName || '测试公司',
    amount: session.amount_total ? session.amount_total / 100 : 299,
    currency: session.currency || 'usd',
    customerEmail: session.customer_details?.email || session.customer_email,
    status: 'pending',
    progress: 0,
    createdAt: new Date(),
    isSimulated: true
  };
  
  // 模拟保存到数据库
  console.log('📝 模拟订单保存:', order.orderId);
  
  // 模拟发送确认邮件
  console.log('📧 模拟发送确认邮件到:', order.customerEmail);
  
  return order;
}

// 实际订单处理函数
async function processRealOrder(session) {
  console.log('💰 处理真实订单:', session.id);
  
  // 提取订单数据
  const metadata = session.metadata || {};
  
  const order = {
    orderId: `WD${Date.now()}`,
    sessionId: session.id,
    planId: metadata.planId,
    companyName: metadata.companyName,
    industry: metadata.industry,
    designStyle: JSON.parse(metadata.stylePreferences || '[]'),
    colorPreferences: JSON.parse(metadata.colorPreferences || '[]'),
    attachmentsCount: parseInt(metadata.attachmentsCount) || 0,
    specialRequirements: metadata.specialRequirements || '',
    amount: session.amount_total / 100,
    currency: session.currency,
    customerEmail: session.customer_details?.email || session.customer_email,
    customerId: session.customer,
    status: 'pending',
    progress: 0,
    currentStage: '需求分析',
    createdAt: new Date(),
    stripeData: {
      paymentIntent: session.payment_intent,
      customer: session.customer,
      paymentStatus: session.payment_status
    }
  };
  
  // TODO: 保存到数据库
  // await saveOrderToDatabase(order);
  console.log('📦 订单数据准备完成:', order.orderId);
  
  // TODO: 发送确认邮件
  // await sendConfirmationEmail(order.customerEmail, order);
  console.log('📧 邮件发送准备完成');
  
  // TODO: 通知设计团队
  // await notifyDesignTeam(order);
  console.log('👥 设计团队通知准备完成');
  
  return order;
}

// Webhook处理器
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 如果是模拟模式
  if (!stripe) {
    console.log('🔄 Webhook运行在模拟模式');
    
    const simulatedSession = {
      id: 'simulated_' + Date.now(),
      metadata: req.body.metadata || {},
      amount_total: req.body.amount || 29900,
      currency: req.body.currency || 'usd',
      customer_details: { email: req.body.customerEmail || 'test@example.com' },
      customer_email: req.body.customerEmail || 'test@example.com',
      payment_status: 'paid'
    };
    
    const order = await simulateOrderProcessing(simulatedSession);
    
    return res.status(200).json({ 
      received: true, 
      mode: 'simulated',
      order: order 
    });
  }

  // 真实模式 - 验证Webhook签名
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      STRIPE_CONFIG.WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook签名验证失败:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`📨 收到Stripe事件: ${event.type}`);

  // 处理不同事件类型
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('✅ 支付完成:', session.id);
      
      try {
        const order = await processRealOrder(session);
        console.log('🎉 订单处理完成:', order.orderId);
        
        // 返回成功响应
        res.status(200).json({ 
          success: true, 
          orderId: order.orderId,
          message: '订单处理完成' 
        });
      } catch (error) {
        console.error('订单处理失败:', error);
        res.status(500).json({ error: '订单处理失败' });
      }
      break;

    case 'checkout.session.expired':
      const expiredSession = event.data.object;
      console.log('⏰ 支付会话过期:', expiredSession.id);
      res.status(200).json({ received: true });
      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('💰 支付成功:', paymentIntent.id);
      res.status(200).json({ received: true });
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('❌ 支付失败:', failedPayment.id, failedPayment.last_payment_error?.message);
      res.status(200).json({ received: true });
      break;

    case 'invoice.payment_succeeded':
      console.log('📄 发票支付成功');
      res.status(200).json({ received: true });
      break;

    case 'invoice.payment_failed':
      console.log('📄 发票支付失败');
      res.status(200).json({ received: true });
      break;

    default:
      console.log(`🔔 未处理的事件类型: ${event.type}`);
      res.status(200).json({ received: true });
  }
}

// 测试Webhook端点
export async function testWebhook(req, res) {
  const testData = {
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'test_session_' + Date.now(),
        metadata: {
          planId: 'test_plan',
          companyName: '测试公司',
          industry: '科技',
          stylePreferences: '["现代"]',
          colorPreferences: '["蓝色"]',
          attachmentsCount: '0'
        },
        amount_total: 29900,
        currency: 'usd',
        customer_details: { email: 'test@example.com' },
        customer_email: 'test@example.com',
        payment_status: 'paid',
        customer: 'test_customer'
      }
    }
  };

  const result = await handler({
    method: 'POST',
    body: testData,
    headers: {}
  }, res);

  return result;
}