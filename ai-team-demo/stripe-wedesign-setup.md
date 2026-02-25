# 🎯 Wedesign Stripe专区设置指南

## 🚀 师傅，请按以下步骤操作：

### **第一步：登录Stripe控制台**
- 打开：https://dashboard.stripe.com
- 确保已登录您的账号

### **第二步：创建Wedesign品牌专区**

#### **设置品牌信息：**
1. 点击左侧 **Settings** → **Branding**
2. 配置：
   ```
   品牌名称: Wedesign
   品牌Logo: 上传Wedesign Logo图片
   主色调: #667eea (蓝色)
   辅助色: #764ba2 (紫色)
   支持邮箱: support@wedesign.com
   ```
3. 点击 **Save**

### **第三步：创建三个测试产品**

#### **产品1：基础套餐**
```
1. 点击 Products → Add product
2. 填写：
   名称: Wedesign 基础套餐
   描述: 基础Logo设计服务，包含3个初稿方案和2次修改
   价格: $299.00 USD
   类型: One-time payment
   产品ID: wedesign-basic-plan (重要！)
3. 点击 Save product
```

#### **产品2：标准套餐**
```
1. 点击 Add product
2. 填写：
   名称: Wedesign 标准套餐
   描述: 完整Logo设计 + 品牌元素，包含5个初稿方案和4次修改
   价格: $599.00 USD
   类型: One-time payment  
   产品ID: wedesign-standard-plan
   标签: 最受欢迎 (可选)
3. 点击 Save product
```

#### **产品3：高级套餐**
```
1. 点击 Add product
2. 填写：
   名称: Wedesign 高级套餐
   描述: 完整品牌系统设计，包含8个初稿方案和无限修改
   价格: $999.00 USD
   类型: One-time payment
   产品ID: wedesign-premium-plan
3. 点击 Save product
```

### **第四步：生成支付链接**

#### **为每个产品创建支付链接：**
```
1. 进入 Products → 选择产品
2. 点击 "Create payment link"
3. 配置：
   - 价格: 选择对应的价格
   - 客户信息: 收集邮箱和姓名
   - 成功重定向: https://wedesign-v1.vercel.app/success
   - 取消重定向: https://wedesign-v1.vercel.app/cancel
4. 点击 "Create link"
5. 复制生成的支付链接
```

#### **需要三个支付链接：**
```
基础套餐: https://buy.stripe.com/test_...
标准套餐: https://buy.stripe.com/test_...
高级套餐: https://buy.stripe.com/test_...
```

### **第五步：获取API密钥**

#### **获取测试密钥：**
```
1. 点击 Developers → API keys
2. 复制：
   - Publishable key: pk_test_51P...
   - Secret key: sk_test_51P... (点击"Reveal test key")
```

### **第六步：设置Webhook**

#### **配置Wedesign专用Webhook：**
```
1. 点击 Developers → Webhooks
2. 点击 "Add endpoint"
3. 填写：
   - Endpoint URL: https://wedesign-v1.vercel.app/api/stripe-webhook
   - 描述: Wedesign支付事件监听
   - 选择事件:
     ✓ checkout.session.completed
     ✓ checkout.session.expired
     ✓ payment_intent.succeeded
     ✓ payment_intent.payment_failed
4. 点击 "Add endpoint"
5. 复制 Signing secret: whsec_...
```

## 📋 需要提供的信息

### **请提供以下9个关键信息：**

#### **1. API密钥 (3个)**
```
PUBLISHABLE_KEY: pk_test_51P...
SECRET_KEY: sk_test_51P...
WEBHOOK_SECRET: whsec_...
```

#### **2. 产品ID (3个)**
```
BASIC_PRODUCT_ID: wedesign-basic-plan
STANDARD_PRODUCT_ID: wedesign-standard-plan  
PREMIUM_PRODUCT_ID: wedesign-premium-plan
```

#### **3. 支付链接 (3个)**
```
BASIC_PAYMENT_LINK: https://buy.stripe.com/test_...
STANDARD_PAYMENT_LINK: https://buy.stripe.com/test_...
PREMIUM_PAYMENT_LINK: https://buy.stripe.com/test_...
```

## 🔧 网站已准备就绪

### **阿宝已完成：**
✅ Wedesign品牌Stripe配置
✅ 支付确认页面
✅ 套餐选择集成
✅ Webhook处理器
✅ 成功/取消页面

### **只等待师傅的配置信息！**

## ⚡ 立即操作清单

### **请在Stripe控制台完成：**
- [ ] 设置Wedesign品牌
- [ ] 创建三个产品
- [ ] 生成三个支付链接
- [ ] 获取API密钥
- [ ] 设置Webhook

### **预计时间：8-12分钟**

## 🎯 验证步骤

### **配置完成后验证：**
1. 访问：https://wedesign-v1.vercel.app/pages/plans.html
2. 选择套餐 → 进入支付页面
3. 点击支付按钮 → 跳转Stripe
4. 使用测试卡号：`4242 4242 4242 4242`
5. 完成测试支付

### **测试卡信息：**
```
卡号: 4242 4242 4242 4242
有效期: 任意未来日期
CVC: 任意三位数
邮编: 任意五位数
```

## 📞 遇到问题？

### **常见问题解决：**
1. **产品创建失败**：检查是否在测试模式
2. **支付链接无效**：确保选择了正确的价格
3. **Webhook设置失败**：检查端点URL是否正确
4. **API密钥无效**：使用测试模式密钥，不是生产模式

### **需要帮助？**
- 截图当前页面发给我们
- 描述具体问题
- 我们远程指导解决

## 🚀 最终目标

### **完成配置后：**
✅ Wedesign品牌支付页面
✅ 三个套餐即时支付
✅ 自动订单创建
✅ 客户账户系统
✅ 设计大厅展示

---

**师傅，请立即开始Stripe配置！**

**我们等待9个配置值，立即上线支付系统！** 💳

**预计完成时间：今天11:00前** ⏰