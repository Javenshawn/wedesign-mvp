# Stripe控制台设置指南

## 🚀 快速设置步骤

### 步骤1：登录Stripe控制台
1. 打开 https://dashboard.stripe.com
2. 使用您的账号登录

### 步骤2：创建三个套餐产品

#### 产品1：基础套餐
```
名称：Wedesign 基础套餐
描述：基础Logo设计服务，包含3个初稿方案和2次修改
价格：$299.00 USD
类型：One-time payment
```

#### 产品2：标准套餐
```
名称：Wedesign 标准套餐
描述：完整Logo设计 + 品牌元素，包含5个初稿方案和4次修改
价格：$599.00 USD
类型：One-time payment
```

#### 产品3：高级套餐
```
名称：Wedesign 高级套餐
描述：完整品牌系统设计，包含8个初稿方案和无限修改
价格：$999.00 USD
类型：One-time payment
```

**操作路径**：Products → Add product

### 步骤3：获取API密钥
1. 进入 **Developers → API keys**
2. 复制以下信息：
   - **Publishable key** (测试模式): `pk_test_...`
   - **Secret key** (测试模式): `sk_test_...`

### 步骤4：设置Webhook端点
1. 进入 **Developers → Webhooks**
2. 点击 **"Add endpoint"**
3. 配置如下：
   ```
   端点URL: https://wedesign-v1.vercel.app/api/stripe-webhook
   监听事件:
     - checkout.session.completed
     - checkout.session.expired
     - payment_intent.succeeded
     - payment_intent.payment_failed
   ```
4. 保存后获取 **Signing secret**: `whsec_...`

### 步骤5：获取产品ID
1. 进入 **Products**
2. 点击每个产品，从URL获取ID：
   ```
   示例URL: https://dashboard.stripe.com/products/prod_xxxxxxxxxxxxxx
   产品ID: prod_xxxxxxxxxxxxxx
   ```

## 📋 需要提供的信息

请提供以下信息给我们：

### 1. API密钥
```
PUBLISHABLE_KEY: pk_test_...
SECRET_KEY: sk_test_...
```

### 2. Webhook配置
```
WEBHOOK_SECRET: whsec_...
```

### 3. 产品ID
```
BASIC_PRODUCT_ID: prod_... (基础套餐)
STANDARD_PRODUCT_ID: prod_... (标准套餐)
PREMIUM_PRODUCT_ID: prod_... (高级套餐)
```

## 🔧 自动化脚本（可选）

如果您想自动化设置，可以在Stripe控制台的控制台中运行以下脚本：

```javascript
// 复制整个stripe-automation-script.js内容到浏览器控制台
// 然后运行: automation.run()
```

## ⚡ 立即行动清单

### 必须完成的项目：
- [ ] 创建三个套餐产品
- [ ] 获取测试API密钥
- [ ] 设置Webhook端点
- [ ] 获取产品ID和Webhook密钥

### 预计时间：10-15分钟

## 🛠️ 技术团队等待的信息

阿宝正在等待以下信息来配置网站：

```javascript
// config/stripe.js - 等待填充
export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: '等待师傅提供',      // pk_test_...
  SECRET_KEY: '等待师傅提供',           // sk_test_...
  WEBHOOK_SECRET: '等待师傅提供',       // whsec_...
  
  PRODUCTS: {
    BASIC: '等待师傅提供',             // 基础套餐产品ID
    STANDARD: '等待师傅提供',          // 标准套餐产品ID
    PREMIUM: '等待师傅提供'            // 高级套餐产品ID
  }
};
```

## 📞 遇到问题？

1. **产品创建问题**：确保在"测试模式"下操作
2. **API密钥问题**：使用测试模式的密钥，不是生产模式
3. **Webhook问题**：端点URL必须可公开访问
4. **权限问题**：确保有足够的账户权限

## 🎯 完成标准

配置完成后，您应该获得：
- ✅ 3个Stripe产品
- ✅ 2个API密钥 (pk_test_, sk_test_)
- ✅ 1个Webhook签名密钥 (whsec_)
- ✅ Webhook端点配置完成

**请将上述信息发送给我们，我们立即集成到网站！**