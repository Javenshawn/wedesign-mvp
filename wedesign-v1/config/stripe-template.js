// Stripe配置模板
// 师傅提供实际值后替换TODO部分

export const STRIPE_CONFIG = {
  // 🔑 API密钥（从Stripe控制台获取）
  PUBLISHABLE_KEY: 'TODO: 从师傅获取 pk_test_...',
  SECRET_KEY: 'TODO: 从师傅获取 sk_test_...',
  WEBHOOK_SECRET: 'TODO: 从师傅获取 whsec_...',
  
  // 📦 产品ID（创建三个套餐后获取）
  PRODUCTS: {
    BASIC: 'TODO: 基础套餐产品ID prod_...',
    STANDARD: 'TODO: 标准套餐产品ID prod_...',
    PREMIUM: 'TODO: 高级套餐产品ID prod_...'
  },
  
  // 💰 价格配置（美元）
  PRICES: {
    BASIC: 29900,    // $299.00
    STANDARD: 59900, // $599.00
    PREMIUM: 99900   // $999.00
  },
  
  // 🌐 网站配置
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://wedesign-v1.vercel.app',
  SUCCESS_URL: '/success?session_id={CHECKOUT_SESSION_ID}',
  CANCEL_URL: '/cancel',
  
  // ⚙️ 其他配置
  CURRENCY: 'usd',
  LOCALE: 'auto'
};

// 产品名称映射
export const PRODUCT_NAMES = {
  [STRIPE_CONFIG.PRODUCTS.BASIC]: 'Wedesign 基础套餐',
  [STRIPE_CONFIG.PRODUCTS.STANDARD]: 'Wedesign 标准套餐',
  [STRIPE_CONFIG.PRODUCTS.PREMIUM]: 'Wedesign 高级套餐'
};

// 产品描述映射
export const PRODUCT_DESCRIPTIONS = {
  [STRIPE_CONFIG.PRODUCTS.BASIC]: '基础Logo设计服务，包含3个初稿方案和2次修改',
  [STRIPE_CONFIG.PRODUCTS.STANDARD]: '完整Logo设计 + 品牌元素，包含5个初稿方案和4次修改',
  [STRIPE_CONFIG.PRODUCTS.PREMIUM]: '完整品牌系统设计，包含8个初稿方案和无限修改'
};

// 验证配置是否完整
export function validateStripeConfig() {
  const missing = [];
  
  if (STRIPE_CONFIG.PUBLISHABLE_KEY.includes('TODO')) missing.push('PUBLISHABLE_KEY');
  if (STRIPE_CONFIG.SECRET_KEY.includes('TODO')) missing.push('SECRET_KEY');
  if (STRIPE_CONFIG.WEBHOOK_SECRET.includes('TODO')) missing.push('WEBHOOK_SECRET');
  
  if (STRIPE_CONFIG.PRODUCTS.BASIC.includes('TODO')) missing.push('BASIC_PRODUCT_ID');
  if (STRIPE_CONFIG.PRODUCTS.STANDARD.includes('TODO')) missing.push('STANDARD_PRODUCT_ID');
  if (STRIPE_CONFIG.PRODUCTS.PREMIUM.includes('TODO')) missing.push('PREMIUM_PRODUCT_ID');
  
  if (missing.length > 0) {
    throw new Error(`Stripe配置不完整，缺少: ${missing.join(', ')}。请师傅提供相关信息。`);
  }
  
  return true;
}