import Stripe from 'stripe';
import { STRIPE_CONFIG, PRODUCT_NAMES, PRODUCT_DESCRIPTIONS, validateStripeConfig } from '../config/stripe.js';

// 初始化Stripe
let stripe;
try {
  validateStripeConfig();
  stripe = new Stripe(STRIPE_CONFIG.SECRET_KEY);
} catch (error) {
  console.error('Stripe配置错误:', error.message);
  // 使用模拟模式，等待师傅提供真实配置
  stripe = { 
    checkout: { 
      sessions: { 
        create: async () => ({ 
          id: 'simulated_session_' + Date.now(),
          url: '/simulated-checkout'
        }) 
      } 
    } 
  };
}

/**
 * 创建Checkout会话
 * @param {string} planId - 套餐ID
 * @param {object} designData - 设计数据
 * @param {string} customerEmail - 客户邮箱
 * @returns {Promise<{sessionId: string, url: string}>}
 */
export async function createCheckoutSession(planId, designData, customerEmail) {
  try {
    console.log('创建Checkout会话:', { planId, customerEmail });
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: STRIPE_CONFIG.CURRENCY,
            product_data: {
              name: PRODUCT_NAMES[planId] || 'Wedesign 设计服务',
              description: PRODUCT_DESCRIPTIONS[planId] || '专业设计服务',
              metadata: {
                planType: planId
              }
            },
            unit_amount: getPlanPrice(planId),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${STRIPE_CONFIG.SITE_URL}${STRIPE_CONFIG.SUCCESS_URL}`,
      cancel_url: `${STRIPE_CONFIG.SITE_URL}${STRIPE_CONFIG.CANCEL_URL}`,
      customer_email: customerEmail,
      metadata: {
        planId: planId,
        companyName: designData.companyName || '',
        industry: designData.industry || '',
        stylePreferences: JSON.stringify(designData.stylePreferences || []),
        colorPreferences: JSON.stringify(designData.colorPreferences || []),
        attachmentsCount: designData.attachments?.length || 0,
        specialRequirements: designData.specialRequirements || ''
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'CN', 'HK', 'TW']
      }
    });

    console.log('Checkout会话创建成功:', session.id);
    
    return {
      sessionId: session.id,
      url: session.url,
      customerId: session.customer
    };
    
  } catch (error) {
    console.error('创建Checkout会话失败:', error);
    
    // 模拟成功响应（开发环境）
    if (process.env.NODE_ENV === 'development') {
      return {
        sessionId: 'dev_session_' + Date.now(),
        url: '/dev-checkout',
        customerId: 'dev_customer_' + Date.now()
      };
    }
    
    throw new Error(`支付处理失败: ${error.message}`);
  }
}

/**
 * 获取套餐价格（分）
 */
function getPlanPrice(planId) {
  if (planId === STRIPE_CONFIG.PRODUCTS.BASIC) return STRIPE_CONFIG.PRICES.BASIC;
  if (planId === STRIPE_CONFIG.PRODUCTS.STANDARD) return STRIPE_CONFIG.PRICES.STANDARD;
  if (planId === STRIPE_CONFIG.PRODUCTS.PREMIUM) return STRIPE_CONFIG.PRICES.PREMIUM;
  return STRIPE_CONFIG.PRICES.BASIC; // 默认基础套餐价格
}

/**
 * 验证会话状态
 */
export async function verifySession(sessionId) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent']
    });
    
    return {
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      amount: session.amount_total / 100,
      currency: session.currency,
      customerEmail: session.customer_details?.email,
      metadata: session.metadata
    };
  } catch (error) {
    console.error('验证会话失败:', error);
    return null;
  }
}

/**
 * 获取客户信息
 */
export async function getCustomer(customerId) {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer;
  } catch (error) {
    console.error('获取客户信息失败:', error);
    return null;
  }
}

/**
 * 创建测试支付（开发用）
 */
export async function createTestPayment(planId = STRIPE_CONFIG.PRODUCTS.BASIC) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('仅限开发环境使用');
  }
  
  const testData = {
    companyName: '测试公司',
    industry: '科技',
    stylePreferences: ['现代', '简约'],
    colorPreferences: ['蓝色', '白色'],
    attachments: [],
    customerEmail: 'test@example.com'
  };
  
  return await createCheckoutSession(planId, testData, testData.customerEmail);
}