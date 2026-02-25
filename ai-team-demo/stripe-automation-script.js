// Stripe控制台自动化脚本
// 师傅可以复制此代码到浏览器控制台运行

class StripeAutomation {
  constructor() {
    this.products = [];
    this.apiKeys = {};
    this.webhookSecret = '';
  }

  // 等待元素出现
  async waitForElement(selector, timeout = 10000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const element = document.querySelector(selector);
      if (element) return element;
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    throw new Error(`元素未找到: ${selector}`);
  }

  // 创建产品
  async createProduct(productData) {
    console.log(`创建产品: ${productData.name}`);
    
    // 1. 点击Products菜单
    const productsLink = await this.waitForElement('a[href*="/products"]');
    productsLink.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 2. 点击Add product按钮
    const addProductBtn = await this.waitForElement('button:contains("Add product")');
    addProductBtn.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 3. 填写产品信息
    const nameInput = await this.waitForElement('input[name="name"]');
    nameInput.value = productData.name;
    nameInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    const descInput = await this.waitForElement('textarea[name="description"]');
    descInput.value = productData.description;
    descInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    // 4. 设置价格（一次性支付）
    const oneTimeBtn = await this.waitForElement('button:contains("One time")');
    oneTimeBtn.click();
    
    const priceInput = await this.waitForElement('input[placeholder="0.00"]');
    priceInput.value = productData.price;
    priceInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    // 5. 保存产品
    const saveBtn = await this.waitForElement('button:contains("Save product")');
    saveBtn.click();
    
    // 6. 等待保存完成，获取产品ID
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 从URL获取产品ID
    const productId = window.location.href.split('/products/')[1];
    console.log(`✅ 产品创建成功: ${productData.name} (ID: ${productId})`);
    
    this.products.push({
      ...productData,
      id: productId
    });
    
    return productId;
  }

  // 获取API密钥
  async getApiKeys() {
    console.log('获取API密钥...');
    
    // 1. 进入API密钥页面
    window.location.href = 'https://dashboard.stripe.com/apikeys';
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 2. 获取Publishable key
    const publishableKeyElement = await this.waitForElement('code:contains("pk_test_")');
    const publishableKey = publishableKeyElement.textContent.trim();
    
    // 3. 点击显示Secret key
    const revealBtn = document.querySelector('button:contains("Reveal test key")');
    if (revealBtn) {
      revealBtn.click();
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // 4. 获取Secret key
    const secretKeyElement = await this.waitForElement('code:contains("sk_test_")');
    const secretKey = secretKeyElement.textContent.trim();
    
    this.apiKeys = {
      publishableKey,
      secretKey
    };
    
    console.log('✅ API密钥获取成功');
    console.log(`Publishable Key: ${publishableKey.substring(0, 20)}...`);
    console.log(`Secret Key: ${secretKey.substring(0, 20)}...`);
    
    return this.apiKeys;
  }

  // 设置Webhook
  async setupWebhook() {
    console.log('设置Webhook端点...');
    
    // 1. 进入Webhooks页面
    window.location.href = 'https://dashboard.stripe.com/webhooks';
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 2. 点击Add endpoint
    const addEndpointBtn = await this.waitForElement('button:contains("Add endpoint")');
    addEndpointBtn.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 3. 输入端点URL
    const urlInput = await this.waitForElement('input[name="url"]');
    urlInput.value = 'https://wedesign-v1.vercel.app/api/stripe-webhook';
    urlInput.dispatchEvent(new Event('input', { bubbles: true }));
    
    // 4. 选择监听事件
    const events = [
      'checkout.session.completed',
      'checkout.session.expired',
      'payment_intent.succeeded',
      'payment_intent.payment_failed'
    ];
    
    for (const event of events) {
      const checkbox = document.querySelector(`input[value="${event}"]`);
      if (checkbox) {
        checkbox.click();
      }
    }
    
    // 5. 保存Webhook
    const saveWebhookBtn = await this.waitForElement('button:contains("Add endpoint")');
    saveWebhookBtn.click();
    
    // 6. 等待创建完成，获取签名密钥
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const secretElement = await this.waitForElement('code:contains("whsec_")');
    this.webhookSecret = secretElement.textContent.trim();
    
    console.log('✅ Webhook设置成功');
    console.log(`签名密钥: ${this.webhookSecret.substring(0, 20)}...`);
    
    return this.webhookSecret;
  }

  // 运行完整自动化流程
  async run() {
    console.log('🚀 开始Stripe控制台自动化...');
    
    try {
      // 创建三个套餐产品
      const productsToCreate = [
        {
          name: 'Wedesign 基础套餐',
          description: '基础Logo设计服务，包含3个初稿方案和2次修改',
          price: '299'
        },
        {
          name: 'Wedesign 标准套餐',
          description: '完整Logo设计 + 品牌元素，包含5个初稿方案和4次修改',
          price: '599'
        },
        {
          name: 'Wedesign 高级套餐',
          description: '完整品牌系统设计，包含8个初稿方案和无限修改',
          price: '999'
        }
      ];
      
      for (const product of productsToCreate) {
        await this.createProduct(product);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // 获取API密钥
      await this.getApiKeys();
      
      // 设置Webhook
      await this.setupWebhook();
      
      // 输出所有配置信息
      console.log('\n🎉 Stripe配置完成！以下是配置信息：\n');
      
      console.log('📦 产品信息：');
      this.products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   ID: ${product.id}`);
        console.log(`   价格: $${product.price}`);
      });
      
      console.log('\n🔑 API密钥：');
      console.log(`Publishable Key: ${this.apiKeys.publishableKey}`);
      console.log(`Secret Key: ${this.apiKeys.secretKey}`);
      
      console.log('\n🔗 Webhook配置：');
      console.log(`端点URL: https://wedesign-v1.vercel.app/api/stripe-webhook`);
      console.log(`签名密钥: ${this.webhookSecret}`);
      
      // 复制到剪贴板
      const config = {
        products: this.products,
        apiKeys: this.apiKeys,
        webhookSecret: this.webhookSecret
      };
      
      navigator.clipboard.writeText(JSON.stringify(config, null, 2))
        .then(() => console.log('\n📋 配置信息已复制到剪贴板！'))
        .catch(err => console.log('无法复制到剪贴板:', err));
      
    } catch (error) {
      console.error('自动化过程出错:', error);
    }
  }
}

// 创建自动化实例并运行
const automation = new StripeAutomation();

// 在浏览器控制台运行: automation.run()
console.log('Stripe自动化脚本已加载！');
console.log('在控制台运行: automation.run() 开始自动化流程');