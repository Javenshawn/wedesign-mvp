// Wedesign Stripe配置
// 专为Wedesign品牌配置的Stripe设置

export const WEDESIGN_STRIPE_CONFIG = {
  // 🏢 品牌信息
  BRAND: {
    NAME: 'Wedesign',
    LOGO: '/assets/images/logo/logo-512.png',
    PRIMARY_COLOR: '#667eea',
    SECONDARY_COLOR: '#764ba2',
    SUPPORT_EMAIL: 'support@wedesign.com'
  },
  
  // 🔑 API密钥（测试环境）
  API_KEYS: {
    PUBLISHABLE_KEY: 'pk_test_51P...', // 等待师傅提供
    SECRET_KEY: 'sk_test_51P...',      // 等待师傅提供
    WEBHOOK_SECRET: 'whsec_...'        // 等待师傅提供
  },
  
  // 📦 产品配置
  PRODUCTS: {
    BASIC: {
      id: 'wedesign-basic-plan',      // 产品ID
      name: 'Wedesign 基础套餐',
      price: 29900,                   // $299.00 (单位：分)
      description: '基础Logo设计服务，包含3个初稿方案和2次修改',
      features: [
        '基础Logo设计',
        '3个初稿方案',
        '2次修改机会',
        '标准文件格式 (PNG, JPG)',
        '7-10个工作日交付',
        '基础品牌指导'
      ],
      paymentLink: 'https://buy.stripe.com/test_...' // 等待师傅提供
    },
    
    STANDARD: {
      id: 'wedesign-standard-plan',
      name: 'Wedesign 标准套餐',
      price: 59900,                   // $599.00
      description: '完整Logo设计 + 品牌元素，包含5个初稿方案和4次修改',
      features: [
        '完整Logo设计',
        '5个初稿方案',
        '4次修改机会',
        '源文件交付 (AI, EPS, SVG)',
        '简单应用场景设计',
        '5-7个工作日交付',
        '品牌应用指导'
      ],
      paymentLink: 'https://buy.stripe.com/test_...', // 等待师傅提供
      recommended: true
    },
    
    PREMIUM: {
      id: 'wedesign-premium-plan',
      name: 'Wedesign 高级套餐',
      price: 99900,                   // $999.00
      description: '完整品牌系统设计，包含8个初稿方案和无限修改',
      features: [
        '品牌系统设计',
        '8个初稿方案',
        '无限修改',
        '所有源文件',
        '完整应用场景设计',
        '品牌指南文档',
        '3-5个工作日交付',
        '优先设计支持'
      ],
      paymentLink: 'https://buy.stripe.com/test_...' // 等待师傅提供
    }
  },
  
  // 🌐 网站配置
  SITE: {
    URL: 'https://wedesign-v1.vercel.app',
    SUCCESS_PATH: '/success',
    CANCEL_PATH: '/cancel',
    DASHBOARD_PATH: '/dashboard'
  },
  
  // ⚙️ 支付配置
  PAYMENT: {
    CURRENCY: 'usd',
    LOCALE: 'auto',
    BILLING_ADDRESS_COLLECTION: 'required',
    ALLOWED_COUNTRIES: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'CN', 'HK', 'TW']
  },
  
  // 📧 邮件配置
  EMAIL: {
    CONFIRMATION_TEMPLATE: 'wedesign-order-confirmation',
    WELCOME_TEMPLATE: 'wedesign-welcome',
    SUPPORT_TEMPLATE: 'wedesign-support'
  }
};

// 验证配置完整性
export function validateWedesignConfig() {
  const config = WEDESIGN_STRIPE_CONFIG;
  const missing = [];
  
  // 检查API密钥
  if (config.API_KEYS.PUBLISHABLE_KEY.includes('...')) missing.push('PUBLISHABLE_KEY');
  if (config.API_KEYS.SECRET_KEY.includes('...')) missing.push('SECRET_KEY');
  if (config.API_KEYS.WEBHOOK_SECRET.includes('...')) missing.push('WEBHOOK_SECRET');
  
  // 检查支付链接
  if (config.PRODUCTS.BASIC.paymentLink.includes('...')) missing.push('BASIC_PAYMENT_LINK');
  if (config.PRODUCTS.STANDARD.paymentLink.includes('...')) missing.push('STANDARD_PAYMENT_LINK');
  if (config.PRODUCTS.PREMIUM.paymentLink.includes('...')) missing.push('PREMIUM_PAYMENT_LINK');
  
  if (missing.length > 0) {
    console.warn('⚠️ Wedesign Stripe配置不完整，缺少:', missing);
    console.log('请师傅提供以下信息：');
    console.log('1. API密钥 (pk_test_, sk_test_, whsec_)');
    console.log('2. 三个套餐的支付链接');
    return false;
  }
  
  console.log('✅ Wedesign Stripe配置验证通过！');
  return true;
}

// 获取产品信息
export function getProductInfo(productId) {
  const products = WEDESIGN_STRIPE_CONFIG.PRODUCTS;
  
  if (productId === products.BASIC.id) return products.BASIC;
  if (productId === products.STANDARD.id) return products.STANDARD;
  if (productId === products.PREMIUM.id) return products.PREMIUM;
  
  return products.BASIC; // 默认返回基础套餐
}

// 获取所有产品列表
export function getAllProducts() {
  return Object.values(WEDESIGN_STRIPE_CONFIG.PRODUCTS);
}

// 获取推荐产品
export function getRecommendedProduct() {
  const products = getAllProducts();
  return products.find(p => p.recommended) || products[0];
}

// 导出默认配置
export default WEDESIGN_STRIPE_CONFIG;