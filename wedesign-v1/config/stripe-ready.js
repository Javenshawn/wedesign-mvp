// Stripe配置 - 等待师傅提供实际值
// 师傅提供信息后，替换下面的TODO部分

// 🔧 配置模板 - 师傅请填写实际值
const STRIPE_CONFIG_TEMPLATE = {
  // 🔑 API密钥（从Stripe控制台获取）
  PUBLISHABLE_KEY: 'TODO: pk_test_...',
  SECRET_KEY: 'TODO: sk_test_...',
  WEBHOOK_SECRET: 'TODO: whsec_...',
  
  // 📦 产品ID（创建三个套餐后获取）
  PRODUCTS: {
    BASIC: 'TODO: prod_...',    // 基础套餐
    STANDARD: 'TODO: prod_...', // 标准套餐
    PREMIUM: 'TODO: prod_...'   // 高级套餐
  }
};

// 🎯 师傅需要提供的信息格式：
/*
请提供以下6个值：

1. Publishable Key: pk_test_51P...
2. Secret Key: sk_test_51P...
3. Webhook Secret: whsec_...
4. 基础套餐产品ID: prod_...
5. 标准套餐产品ID: prod_...
6. 高级套餐产品ID: prod_...
*/

// ⚡ 开发团队已准备好，等待配置
console.log('🚀 Stripe集成准备就绪！');
console.log('📋 等待师傅提供Stripe配置信息...');
console.log('🔧 需要6个关键值（见上方注释）');

// 配置验证函数
export function validateAndApplyConfig(userConfig) {
  const required = [
    'PUBLISHABLE_KEY',
    'SECRET_KEY', 
    'WEBHOOK_SECRET',
    'PRODUCTS.BASIC',
    'PRODUCTS.STANDARD',
    'PRODUCTS.PREMIUM'
  ];
  
  const missing = [];
  
  for (const key of required) {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      if (!userConfig[parent]?.[child] || userConfig[parent][child].includes('TODO')) {
        missing.push(key);
      }
    } else if (!userConfig[key] || userConfig[key].includes('TODO')) {
      missing.push(key);
    }
  }
  
  if (missing.length > 0) {
    console.error('❌ 配置不完整，缺少:', missing);
    return false;
  }
  
  console.log('✅ Stripe配置验证通过！');
  console.log('🔑 API密钥已设置');
  console.log('📦 产品ID已配置');
  console.log('🔗 Webhook已准备');
  
  return true;
}

// 导出配置
export const STRIPE_CONFIG = STRIPE_CONFIG_TEMPLATE;

// 产品信息映射
export const PRODUCT_INFO = {
  [STRIPE_CONFIG.PRODUCTS.BASIC]: {
    name: 'Wedesign 基础套餐',
    price: 29900,
    description: '基础Logo设计服务'
  },
  [STRIPE_CONFIG.PRODUCTS.STANDARD]: {
    name: 'Wedesign 标准套餐',
    price: 59900,
    description: '完整Logo设计 + 品牌元素'
  },
  [STRIPE_CONFIG.PRODUCTS.PREMIUM]: {
    name: 'Wedesign 高级套餐',
    price: 99900,
    description: '完整品牌系统设计'
  }
};

// 等待师傅配置
console.log('\n📞 请师傅：');
console.log('1. 登录Stripe控制台');
console.log('2. 创建三个套餐产品');
console.log('3. 获取API密钥和Webhook密钥');
console.log('4. 提供上述6个值给我们');
console.log('\n⚡ 我们立即完成支付集成！');