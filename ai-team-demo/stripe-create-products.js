// Stripe产品创建自动化脚本
// 在师傅提供的产品创建页面运行此脚本

class StripeProductCreator {
  constructor() {
    this.products = [
      {
        name: 'Wedesign 基础套餐',
        description: '基础Logo设计服务，包含3个初稿方案和2次修改',
        price: '299',
        id: 'wedesign-basic-sandbox',
        tags: ['基础设计', 'logo']
      },
      {
        name: 'Wedesign 标准套餐',
        description: '完整Logo设计 + 品牌元素，包含5个初稿方案和4次修改',
        price: '599',
        id: 'wedesign-standard-sandbox',
        tags: ['最受欢迎', '标准设计', 'logo']
      },
      {
        name: 'Wedesign 高级套餐',
        description: '完整品牌系统设计，包含8个初稿方案和无限修改',
        price: '999',
        id: 'wedesign-premium-sandbox',
        tags: ['高级服务', '品牌系统']
      }
    ];
    
    this.createdProducts = [];
    this.logs = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    this.logs.push({ time: timestamp, message, type });
    
    const colors = {
      info: 'color: blue',
      success: 'color: green; font-weight: bold',
      error: 'color: red; font-weight: bold',
      warning: 'color: orange'
    };
    
    console.log(`%c${logEntry}`, colors[type] || colors.info);
    return logEntry;
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 查找元素
  findElement(selector, text = '') {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
      if (!text) return el;
      
      const elText = el.textContent?.trim() || 
                    el.value || 
                    el.placeholder || 
                    el.getAttribute('aria-label') || '';
      
      if (elText.toLowerCase().includes(text.toLowerCase())) {
        return el;
      }
    }
    return null;
  }

  // 点击元素
  async clickElement(selector, text = '') {
    const element = this.findElement(selector, text);
    if (element) {
      element.click();
      await this.wait(1000);
      return true;
    }
    return false;
  }

  // 输入文本
  async typeText(selector, text) {
    const element = this.findElement(selector);
    if (element) {
      element.value = text;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
      await this.wait(500);
      return true;
    }
    return false;
  }

  // 创建单个产品
  async createProduct(product) {
    this.log(`创建产品: ${product.name}`);
    
    try {
      // 等待页面加载
      await this.wait(2000);
      
      // 查找产品名称输入框
      const nameInput = this.findElement('input[name="name"], input[placeholder*="Name"], input[data-testid*="name"]');
      if (!nameInput) {
        throw new Error('找不到产品名称输入框');
      }
      
      // 填写产品名称
      nameInput.value = product.name;
      nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      this.log(`已填写名称: ${product.name}`);
      
      // 查找描述输入框
      const descInput = this.findElement('textarea[name="description"], textarea[placeholder*="Description"]');
      if (descInput) {
        descInput.value = product.description;
        descInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.log('已填写描述');
      }
      
      // 查找价格输入框
      const priceInput = this.findElement('input[placeholder*="0.00"], input[name*="price"], input[data-testid*="price"]');
      if (priceInput) {
        priceInput.value = product.price;
        priceInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.log(`已设置价格: $${product.price}`);
      }
      
      // 查找产品ID输入框（如果有）
      const idInput = this.findElement('input[name="id"], input[placeholder*="ID"]');
      if (idInput) {
        idInput.value = product.id;
        idInput.dispatchEvent(new Event('input', { bubbles: true }));
        this.log(`已设置产品ID: ${product.id}`);
      }
      
      // 查找保存按钮
      const saveButton = this.findElement('button', 'Save product') || 
                        this.findElement('button', 'Create product') ||
                        this.findElement('button[type="submit"]');
      
      if (!saveButton) {
        throw new Error('找不到保存按钮');
      }
      
      // 点击保存
      saveButton.click();
      this.log('正在保存产品...');
      
      // 等待保存完成
      await this.wait(3000);
      
      // 检查是否保存成功
      const successIndicator = document.querySelector('.success-message, [data-testid*="success"]') ||
                              document.body.innerText.includes('Product created') ||
                              document.body.innerText.includes('产品已创建');
      
      if (successIndicator) {
        // 获取产品ID（从URL或页面元素）
        const productId = this.extractProductId();
        
        this.createdProducts.push({
          ...product,
          stripeId: productId
        });
        
        this.log(`✅ 产品创建成功: ${product.name}`, 'success');
        this.log(`产品ID: ${productId || '从URL提取中...'}`);
        
        return true;
      } else {
        throw new Error('产品保存失败，请检查表单');
      }
      
    } catch (error) {
      this.log(`❌ 产品创建失败: ${error.message}`, 'error');
      return false;
    }
  }

  // 从URL提取产品ID
  extractProductId() {
    const url = window.location.href;
    
    // 尝试从URL提取
    const urlMatch = url.match(/\/products\/(prod_[a-zA-Z0-9_]+)/);
    if (urlMatch) return urlMatch[1];
    
    // 尝试从页面元素提取
    const idElement = document.querySelector('[data-testid*="product-id"], .product-id, code');
    if (idElement) {
      const text = idElement.textContent.trim();
      const idMatch = text.match(/prod_[a-zA-Z0-9_]+/);
      if (idMatch) return idMatch[0];
    }
    
    return null;
  }

  // 创建支付链接
  async createPaymentLink(product) {
    this.log(`为 ${product.name} 创建支付链接`);
    
    try {
      // 导航回产品列表
      await this.clickElement('a[href*="/products"], button[data-testid*="back"]');
      await this.wait(2000);
      
      // 查找刚创建的产品
      const productRow = this.findProductRow(product.name);
      if (!productRow) {
        throw new Error('找不到产品行');
      }
      
      // 点击产品进入详情
      productRow.click();
      await this.wait(2000);
      
      // 查找创建支付链接按钮
      const paymentLinkBtn = this.findElement('button', 'Create payment link') ||
                            this.findElement('button', 'Payment link');
      
      if (!paymentLinkBtn) {
        throw new Error('找不到创建支付链接按钮');
      }
      
      paymentLinkBtn.click();
      await this.wait(2000);
      
      // 配置支付链接
      const successUrl = 'https://wedesign-v1.vercel.app/success';
      const cancelUrl = 'https://wedesign-v1.vercel.app/cancel';
      
      // 填写成功URL
      const successInput = this.findElement('input[placeholder*="Success URL"]');
      if (successInput) {
        successInput.value = successUrl;
        successInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      
      // 填写取消URL
      const cancelInput = this.findElement('input[placeholder*="Cancel URL"]');
      if (cancelInput) {
        cancelInput.value = cancelUrl;
        cancelInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      
      // 创建链接
      const createBtn = this.findElement('button', 'Create link');
      if (createBtn) {
        createBtn.click();
        await this.wait(3000);
        
        // 获取支付链接
        const linkElement = document.querySelector('a[href*="buy.stripe.com"], input[value*="buy.stripe.com"]');
        if (linkElement) {
          const paymentLink = linkElement.href || linkElement.value;
          product.paymentLink = paymentLink;
          
          this.log(`✅ 支付链接创建成功`, 'success');
          this.log(`链接: ${paymentLink.substring(0, 50)}...`);
          
          return paymentLink;
        }
      }
      
      throw new Error('支付链接创建失败');
      
    } catch (error) {
      this.log(`❌ 支付链接创建失败: ${error.message}`, 'error');
      return null;
    }
  }

  // 查找产品行
  findProductRow(productName) {
    const rows = document.querySelectorAll('tr, .product-row, [data-testid*="product-row"]');
    
    for (const row of rows) {
      if (row.textContent.includes(productName)) {
        return row;
      }
    }
    
    return null;
  }

  // 运行完整流程
  async run() {
    this.log('🚀 开始创建Wedesign三个套餐产品', 'success');
    this.log('请勿操作浏览器，脚本自动执行...', 'info');
    
    try {
      // 检查是否在产品创建页面
      const isProductPage = window.location.href.includes('/products') && 
                           (document.body.innerText.includes('Create product') || 
                            document.body.innerText.includes('Add product'));
      
      if (!isProductPage) {
        this.log('❌ 不在产品创建页面，请导航到产品创建页面', 'error');
        this.log('当前页面:', window.location.href);
        return;
      }
      
      // 创建三个产品
      for (const product of this.products) {
        this.log(`\n▶️ 创建产品: ${product.name}`, 'success');
        
        const success = await this.createProduct(product);
        if (!success) {
          this.log('❌ 产品创建流程中断', 'error');
          return;
        }
        
        // 为前两个产品创建支付链接（第三个产品创建后可能没有返回按钮）
        if (product.id !== 'wedesign-premium-sandbox') {
          const paymentLink = await this.createPaymentLink(product);
          if (paymentLink) {
            product.paymentLink = paymentLink;
          }
        }
        
        // 如果是最后一个产品，不等待返回
        if (product.id !== 'wedesign-premium-sandbox') {
          await this.wait(2000);
        }
      }
      
      // 输出创建结果
      this.outputResults();
      
    } catch (error) {
      this.log(`❌ 自动化流程异常: ${error.message}`, 'error');
      this.log('请检查页面状态并重试', 'info');
    }
  }

  // 输出结果
  outputResults() {
    this.log('\n🎉 产品创建完成！', 'success');
    this.log('='.repeat(60));
    
    if (this.createdProducts.length === 0) {
      this.log('❌ 没有成功创建任何产品', 'error');
      return;
    }
    
    this.log(`✅ 成功创建 ${this.createdProducts.length} 个产品`);
    
    // 整理配置信息
    const config = {
      products: this.createdProducts.map(p => ({
        name: p.name,
        id: p.id,
        stripeId: p.stripeId,
        price: `$${p.price}`,
        paymentLink: p.paymentLink || '需要手动创建'
      })),
      
      // 需要师傅继续提供的配置
      neededConfig: {
        webhookSecret: 'whsec_... (需要在Webhooks页面设置)',
        missingPaymentLinks: this.createdProducts.filter(p => !p.paymentLink).map(p => p.name)
      }
    };
    
    // 输出配置
    console.log('\n📋 产品配置信息：');
    console.log(JSON.stringify(config, null, 2));
    
    // 复制到剪贴板
    try {
      navigator.clipboard.writeText(JSON.stringify(config, null, 2))
        .then(() => {
          this.log('\n📋 配置已复制到剪贴板！', 'success');
        })
        .catch(() => {
          this.log('⚠️ 无法复制到剪贴板，请手动复制', 'warning');
        });
    } catch (e) {
      this.log('⚠️ 剪贴板访问被阻止，请手动复制', 'warning');
    }
    
    // 下一步指导
    this.log('\n🚀 下一步需要师傅：');
    this.log('1. 检查三个产品是否创建成功');
    this.log('2. 为高级套餐手动创建支付链接');
    this.log('3. 设置Webhook端点 (Developers → Webhooks)');
    this.log('4. 提供Webhook签名密钥 (whsec_...)');
    
    this.log('\n🔗 产品创建页面:', window.location.href);
  }

  // 快速测试
  async test() {
    this.log('🧪 运行快速测试...', 'info');
    
    // 测试页面元素
    const elements = [
      { selector: 'input[name="name"]', desc: '产品名称输入框' },
      { selector: 'textarea[name="description"]', desc: '产品描述输入框' },
      { selector: 'input[placeholder*="0.00"]', desc: '价格输入框' },
      { selector: 'button:contains("Save")', desc: '保存按钮' }
    ];
    
    for (const elem of elements) {
      const found = !!this.findElement(elem.selector);
      this.log(`${found ? '✅' : '❌'} ${elem.desc}: ${found ? '找到' : '未找到'}`);
    }
    
    return elements.every(e => this.findElement(e.selector));
  }
}

// 创建实例
const productCreator = new StripeProductCreator();

// 在控制台运行: productCreator.run()
console.log('Stripe产品创建脚本已加载！');
console.log('在控制台运行: productCreator.run() 开始创建三个套餐产品');
console.log('运行: productCreator.test() 测试页面元素');