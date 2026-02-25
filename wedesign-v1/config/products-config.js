// 网站产品卡片配置
// 直接对应Stripe三个产品

export const WEBSITE_PRODUCTS = {
  // 基础套餐
  BASIC: {
    // 网站显示配置
    display: {
      id: 'basic',
      name: 'Wedesign 基础套餐',
      price: 299,
      currency: 'USD',
      period: '一次性支付',
      badge: '入门推荐',
      color: '#667eea',
      features: [
        '基础Logo设计',
        '3个初稿方案',
        '2次修改机会',
        '标准文件格式 (PNG, JPG)',
        '7-10个工作日交付',
        '基础品牌指导'
      ],
      ctaText: '选择基础套餐',
      popular: false
    },
    
    // Stripe对应配置
    stripe: {
      productId: 'wedesign-basic-sandbox', // 师傅创建时使用
      priceId: 'price_basic_sandbox',      // Stripe生成
      paymentLink: '等待师傅提供 https://buy.stripe.com/test_...',
      description: '基础Logo设计服务，包含3个初稿方案和2次修改'
    },
    
    // 设计流程
    workflow: {
      draftCount: 3,
      revisionCount: 2,
      deliveryDays: '7-10',
      fileFormats: ['PNG', 'JPG'],
      includesBrandGuide: false,
      prioritySupport: false
    }
  },
  
  // 标准套餐
  STANDARD: {
    // 网站显示配置
    display: {
      id: 'standard',
      name: 'Wedesign 标准套餐',
      price: 599,
      currency: 'USD',
      period: '一次性支付',
      badge: '最受欢迎',
      color: '#764ba2',
      features: [
        '完整Logo设计',
        '5个初稿方案',
        '4次修改机会',
        '源文件交付 (AI, EPS, SVG)',
        '简单应用场景设计',
        '5-7个工作日交付',
        '品牌应用指导'
      ],
      ctaText: '选择标准套餐',
      popular: true
    },
    
    // Stripe对应配置
    stripe: {
      productId: 'wedesign-standard-sandbox',
      priceId: 'price_standard_sandbox',
      paymentLink: '等待师傅提供 https://buy.stripe.com/test_...',
      description: '完整Logo设计 + 品牌元素，包含5个初稿方案和4次修改'
    },
    
    // 设计流程
    workflow: {
      draftCount: 5,
      revisionCount: 4,
      deliveryDays: '5-7',
      fileFormats: ['AI', 'EPS', 'SVG', 'PNG', 'JPG'],
      includesBrandGuide: true,
      prioritySupport: true
    }
  },
  
  // 高级套餐
  PREMIUM: {
    // 网站显示配置
    display: {
      id: 'premium',
      name: 'Wedesign 高级套餐',
      price: 999,
      currency: 'USD',
      period: '一次性支付',
      badge: '高级服务',
      color: '#4ade80',
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
      ctaText: '选择高级套餐',
      popular: false
    },
    
    // Stripe对应配置
    stripe: {
      productId: 'wedesign-premium-sandbox',
      priceId: 'price_premium_sandbox',
      paymentLink: '等待师傅提供 https://buy.stripe.com/test_...',
      description: '完整品牌系统设计，包含8个初稿方案和无限修改'
    },
    
    // 设计流程
    workflow: {
      draftCount: 8,
      revisionCount: '无限',
      deliveryDays: '3-5',
      fileFormats: ['所有格式', '分层文件'],
      includesBrandGuide: true,
      prioritySupport: true
    }
  }
};

// 获取所有产品
export function getAllProducts() {
  return Object.values(WEBSITE_PRODUCTS);
}

// 根据ID获取产品
export function getProductById(productId) {
  return Object.values(WEBSITE_PRODUCTS).find(
    product => product.display.id === productId || product.stripe.productId === productId
  );
}

// 获取推荐产品
export function getRecommendedProduct() {
  return Object.values(WEBSITE_PRODUCTS).find(product => product.display.popular) || WEBSITE_PRODUCTS.STANDARD;
}

// 验证Stripe配置
export function validateStripeConfig() {
  const products = getAllProducts();
  const missing = [];
  
  products.forEach(product => {
    if (!product.stripe.paymentLink || product.stripe.paymentLink.includes('等待')) {
      missing.push(`${product.display.name} 支付链接`);
    }
  });
  
  if (missing.length > 0) {
    console.warn('⚠️ Stripe支付链接未配置:', missing);
    console.log('请师傅在Stripe创建三个产品并生成支付链接');
    return false;
  }
  
  console.log('✅ 产品配置验证通过');
  console.log('📦 三个产品卡片已配置');
  console.log('💳 等待支付链接集成');
  
  return true;
}

// 导出默认配置
export default WEBSITE_PRODUCTS;