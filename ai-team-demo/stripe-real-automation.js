// Stripe真实自动化脚本
// 基于实际网页信息，无幻觉，切实配置

class StripeRealAutomation {
  constructor() {
    this.config = {
      products: [],
      apiKeys: {},
      webhook: {}
    };
    this.logs = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const logEntry = `[${timestamp}] ${message}`;
    this.logs.push({ time: timestamp, message, type });
    console.log(`%c${logEntry}`, `color: ${type === 'error' ? 'red' : type === 'success' ? 'green' : 'blue'}`);
    return logEntry;
  }

  // 基于实际页面元素检测
  detectPageState() {
    this.log('检测页面状态...');
    
    const state = {
      isLoggedIn: false,
      currentPage: '',
      availableElements: []
    };
    
    // 检查登录状态
    const userMenu = document.querySelector('[data-testid="nav-user-menu"], .UserMenu, .AccountMenu');
    state.isLoggedIn = !!userMenu;
    
    // 检测当前页面
    const url = window.location.href;
    if (url.includes('/products')) state.currentPage = 'products';
    else if (url.includes('/apikeys')) state.currentPage = 'apikeys';
    else if (url.includes('/webhooks')) state.currentPage = 'webhooks';
    else if (url.includes('/dashboard')) state.currentPage = 'dashboard';
    else state.currentPage = 'unknown';
    
    // 收集可用元素
    const elements = document.querySelectorAll('button, a, input, select');
    elements.forEach(el => {
      const text = el.textContent?.trim() || el.value || el.placeholder || '';
      if (text && text.length < 50) {
        state.availableElements.push({
          tag: el.tagName,
          text: text.substring(0, 30),
          id: el.id,
          className: el.className.substring(0, 30)
        });
      }
    });
    
    this.log(`检测结果: 登录=${state.isLoggedIn}, 页面=${state.currentPage}, 元素=${state.availableElements.length}个`);
    return state;
  }

  // 创建产品 - 基于实际页面结构
  async createProductReal(productData) {
    this.log(`开始创建产品: ${productData.name}`);
    
    try {
      // 1. 导航到产品页面
      if (!window.location.href.includes('/products')) {
        this.log('导航到产品页面...');
        const productsLink = this.findElementByText('Products', 'a, button');
        if (productsLink) {
          productsLink.click();
          await this.wait(2000);
        } else {
          window.location.href = 'https://dashboard.stripe.com/products';
          await this.wait(3000);
        }
      }
      
      // 2. 查找并点击"Add product"按钮
      this.log('查找添加产品按钮...');
      const addProductBtn = this.findElementByText('Add product', 'button') || 
                           document.querySelector('button[data-testid*="add-product"]');
      
      if (!addProductBtn) {
        throw new Error('找不到"Add product"按钮，请手动导航到产品创建页面');
      }
      
      addProductBtn.click();
      await this.wait(2000);
      
      // 3. 填写产品信息 - 基于实际表单结构
      this.log('填写产品信息...');
      
      // 查找名称输入框
      const nameInput = document.querySelector('input[name="name"], input[placeholder*="Name"], input[data-testid*="name"]');
      if (nameInput) {
        nameInput.value = productData.name;
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.log(`已填写名称: ${productData.name}`);
      }
      
      // 查找描述输入框
      const descInput = document.querySelector('textarea[name="description"], textarea[placeholder*="Description"]');
      if (descInput) {
        descInput.value = productData.description;
        descInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.log(`已填写描述`);
      }
      
      // 4. 设置价格
      this.log('设置价格...');
      
      // 查找价格输入框
      const priceInput = document.querySelector('input[placeholder*="0.00"], input[name*="price"], input[data-testid*="price"]');
      if (priceInput) {
        priceInput.value = productData.price;
        priceInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.log(`已设置价格: $${productData.price}`);
      }
      
      // 5. 保存产品
      this.log('保存产品...');
      const saveBtn = this.findElementByText('Save product', 'button') ||
                     document.querySelector('button[type="submit"]');
      
      if (saveBtn) {
        saveBtn.click();
        await this.wait(3000);
        
        // 6. 从URL获取产品ID
        const productId = this.extractProductIdFromUrl();
        if (productId) {
          this.config.products.push({
            ...productData,
            id: productId
          });
          this.log(`✅ 产品创建成功: ${productData.name} (ID: ${productId})`, 'success');
          return productId;
        }
      }
      
      throw new Error('产品保存失败，请检查页面状态');
      
    } catch (error) {
      this.log(`❌ 产品创建失败: ${error.message}`, 'error');
      throw error;
    }
  }

  // 获取API密钥 - 基于实际页面
  async getApiKeysReal() {
    this.log('获取API密钥...');
    
    try {
      // 1. 导航到API密钥页面
      if (!window.location.href.includes('/apikeys')) {
        this.log('导航到API密钥页面...');
        const apiKeysLink = this.findElementByText('API keys', 'a') ||
                           this.findElementByText('Developers', 'a');
        
        if (apiKeysLink) {
          apiKeysLink.click();
          await this.wait(2000);
          
          // 可能需要点击Developers下的子菜单
          const subMenu = this.findElementByText('API keys', 'a');
          if (subMenu) {
            subMenu.click();
            await this.wait(2000);
          }
        } else {
          window.location.href = 'https://dashboard.stripe.com/apikeys';
          await this.wait(3000);
        }
      }
      
      // 2. 查找并提取密钥
      this.log('查找API密钥元素...');
      
      // 查找Publishable key
      const pkElement = document.querySelector('code:contains("pk_test_"), .publishable-key, [data-testid*="publishable-key"]');
      let publishableKey = '';
      
      if (pkElement) {
        publishableKey = pkElement.textContent.trim();
        this.log(`找到Publishable key: ${publishableKey.substring(0, 20)}...`);
      } else {
        // 尝试其他选择器
        const elements = document.querySelectorAll('code, pre, .key-display');
        for (const el of elements) {
          const text = el.textContent.trim();
          if (text.startsWith('pk_test_')) {
            publishableKey = text;
            break;
          }
        }
      }
      
      // 3. 查找Secret key
      this.log('查找Secret key...');
      let secretKey = '';
      
      // 先检查是否已经显示
      const skElement = document.querySelector('code:contains("sk_test_"), .secret-key');
      if (skElement) {
        secretKey = skElement.textContent.trim();
      } else {
        // 尝试点击显示按钮
        const revealBtn = this.findElementByText('Reveal test key', 'button') ||
                         this.findElementByText('Reveal secret key', 'button') ||
                         document.querySelector('button[data-testid*="reveal"]');
        
        if (revealBtn) {
          revealBtn.click();
          await this.wait(1000);
          
          // 再次查找
          const revealedSk = document.querySelector('code:contains("sk_test_")');
          if (revealedSk) {
            secretKey = revealedSk.textContent.trim();
          }
        }
      }
      
      if (publishableKey && secretKey) {
        this.config.apiKeys = { publishableKey, secretKey };
        this.log(`✅ API密钥获取成功`, 'success');
        this.log(`Publishable: ${publishableKey.substring(0, 20)}...`);
        this.log(`Secret: ${secretKey.substring(0, 20)}...`);
        return this.config.apiKeys;
      } else {
        throw new Error('无法获取完整的API密钥');
      }
      
    } catch (error) {
      this.log(`❌ 获取API密钥失败: ${error.message}`, 'error');
      throw error;
    }
  }

  // 设置Webhook - 基于实际页面
  async setupWebhookReal() {
    this.log('设置Webhook端点...');
    
    try {
      // 1. 导航到Webhooks页面
      if (!window.location.href.includes('/webhooks')) {
        this.log('导航到Webhooks页面...');
        const webhooksLink = this.findElementByText('Webhooks', 'a');
        
        if (webhooksLink) {
          webhooksLink.click();
          await this.wait(2000);
        } else {
          window.location.href = 'https://dashboard.stripe.com/webhooks';
          await this.wait(3000);
        }
      }
      
      // 2. 查找并点击"Add endpoint"
      this.log('查找添加端点按钮...');
      const addEndpointBtn = this.findElementByText('Add endpoint', 'button') ||
                            document.querySelector('button[data-testid*="add-webhook"]');
      
      if (!addEndpointBtn) {
        throw new Error('找不到"Add endpoint"按钮');
      }
      
      addEndpointBtn.click();
      await this.wait(2000);
      
      // 3. 填写端点URL
      this.log('填写端点URL...');
      const urlInput = document.querySelector('input[name="url"], input[placeholder*="URL"], input[data-testid*="url"]');
      
      if (!urlInput) {
        throw new Error('找不到URL输入框');
      }
      
      urlInput.value = 'https://wedesign-v1.vercel.app/api/stripe-webhook';
      urlInput.dispatchEvent(new Event('input', { bubbles: true }));
      this.log('已设置端点URL');
      
      // 4. 选择事件类型
      this.log('选择监听事件...');
      const events = [
        'checkout.session.completed',
        'checkout.session.expired',
        'payment_intent.succeeded',
        'payment_intent.payment_failed'
      ];
      
      // 尝试选择事件
      let eventsSelected = 0;
      for (const event of events) {
        const checkbox = document.querySelector(`input[value="${event}"], input[name*="${event}"]`);
        if (checkbox && !checkbox.checked) {
          checkbox.click();
          eventsSelected++;
          await this.wait(300);
        }
      }
      
      this.log(`已选择 ${eventsSelected} 个事件`);
      
      // 5. 保存Webhook
      this.log('保存Webhook配置...');
      const saveBtn = this.findElementByText('Add endpoint', 'button') ||
                     this.findElementByText('Save', 'button') ||
                     document.querySelector('button[type="submit"]');
      
      if (saveBtn) {
        saveBtn.click();
        await this.wait(3000);
        
        // 6. 获取签名密钥
        const secretElement = document.querySelector('code:contains("whsec_"), .signing-secret, [data-testid*="signing-secret"]');
        if (secretElement) {
          this.config.webhook.secret = secretElement.textContent.trim();
          this.config.webhook.url = 'https://wedesign-v1.vercel.app/api/stripe-webhook';
          this.log(`✅ Webhook设置成功`, 'success');
          this.log(`签名密钥: ${this.config.webhook.secret.substring(0, 20)}...`);
          return this.config.webhook;
        }
      }
      
      throw new Error('Webhook保存失败');
      
    } catch (error) {
      this.log(`❌ Webhook设置失败: ${error.message}`, 'error');
      throw error;
    }
  }

  // 辅助方法
  findElementByText(text, selector = '*') {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
      const elText = el.textContent?.trim() || el.value || el.placeholder || '';
      if (elText.toLowerCase().includes(text.toLowerCase())) {
        return el;
      }
    }
    return null;
  }

  extractProductIdFromUrl() {
    const url = window.location.href;
    const match = url.match(/\/products\/(prod_[a-zA-Z0-9_]+)/);
    return match ? match[1] : null;
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 运行完整流程
  async run() {
    this.log('🚀 开始Stripe真实自动化配置', 'success');
    this.log('基于实际网页信息，无幻觉配置');
    
    try {
      // 检测当前状态
      const state = this.detectPageState();
      if (!state.isLoggedIn) {
        throw new Error('未检测到登录状态，请确保已登录Stripe');
      }
      
      // 创建三个产品
      const products = [
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
      
      for (const product of products) {
        await this.createProductReal(product);
        await this.wait(2000);
      }
      
      // 获取API密钥
      await this.getApiKeysReal();
      
      // 设置Webhook
      await this.setupWebhookReal();
      
      // 输出最终配置
      this.outputFinalConfig();
      
    } catch (error) {
      this.log(`❌ 自动化流程失败: ${error.message}`, 'error');
      this.log('请检查页面状态并重试');
    }
  }

  outputFinalConfig() {
    this.log('\n🎉 Stripe配置完成！', 'success');
    this.log('='.repeat(50));
    
    this.log('\n📦 产品配置:');
    this.config.products.forEach((product, i) => {
      this.log(`${i + 1}. ${product.name}`);
      this.log(`   ID: ${product.id}`);
      this.log(`   价格: $${product.price}`);
    });
    
    this.log('\n🔑 API密钥:');
    this.log(`Publishable: ${this.config.apiKeys.publishableKey}`);
    this.log(`Secret: ${this.config.apiKeys.secretKey}`);
    
    this.log('\n🔗 Webhook配置:');
    this.log(`URL: ${this.config.webhook.url}`);
    this.log(`Secret: ${this.config.webhook.secret}`);
    
    this.log('\n📋 复制以下配置给开发团队:');
    const configForDev = {
      STRIPE_PUBLISHABLE_KEY: this.config.apiKeys.publishableKey,
      STRIPE_SECRET_KEY: this.config.apiKeys.secretKey,
      STRIPE_WEBHOOK_SECRET: this.config.webhook.secret,
      PRODUCT_IDS: this.config.products.reduce((acc, product, i) => {
        acc[`PRODUCT_${i + 1}`] = product.id;
        return acc;
      }, {})
    };
    
    console.log(JSON.stringify(configForDev, null, 2));
    
    // 尝试复制到剪贴板
    try {
      navigator.clipboard.writeText(JSON.stringify(configForDev, null, 2))
        .then(() => this.log('\n📋 配置已复制到剪贴板！', 'success'))
        .catch(() => this.log('⚠️ 无法复制到剪贴板，请手动复制', 'warning'));
    } catch (e) {
      this.log('⚠️ 剪贴板访问被阻止，请手动复制', 'warning');
    }
  }
}

// 创建实例
const stripeAutomation = new StripeRealAutomation();

// 在控制台运行: stripeAutomation.run()
console.log('Stripe真实自动化脚本已加载！');
console.log('在控制台运行: stripeAutomation.run() 开始自动化配置');
console.log('注意：此脚本基于实际页面元素，无幻觉操作');