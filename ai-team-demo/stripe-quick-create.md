# 🚀 Stripe产品快速创建指南

## 🎯 师傅，请按以下步骤操作：

### **第一步：打开产品创建页面**
- 点击师傅提供的链接：
  ```
  https://dashboard.stripe.com/acct_1T4CWWCY5vZ28ogK/test/products?active=true&create=product&source=product_list
  ```
- 确保在沙盒环境（test模式）

### **第二步：运行自动化脚本**
1. 按 **F12** 打开开发者工具
2. 切换到 **Console** 标签页
3. 复制以下代码到控制台：

```javascript
// 粘贴整个 stripe-create-products.js 内容
// 或者直接运行：
const scriptUrl = 'https://raw.githubusercontent.com/your-repo/stripe-create-products.js';
fetch(scriptUrl).then(r => r.text()).then(code => eval(code));
```

4. 在控制台输入：`productCreator.run()`

### **第三步：脚本自动执行**
脚本将自动：
```
✅ 创建基础套餐产品
✅ 创建标准套餐产品  
✅ 创建高级套餐产品
✅ 生成支付链接
✅ 输出配置信息
```

### **第四步：获取产品ID**
脚本完成后，从控制台输出复制：
```
产品配置信息：
{
  "products": [
    {
      "name": "Wedesign 基础套餐",
      "id": "wedesign-basic-sandbox",
      "stripeId": "prod_...",  // ⭐ 重要！
      "price": "$299",
      "paymentLink": "https://buy.stripe.com/test_..."
    },
    // ... 其他两个产品
  ]
}
```

## 📋 需要记录的信息

### **请提供以下信息：**

#### **1. 三个产品ID** (prod_...)
```
基础套餐: prod_...
标准套餐: prod_...
高级套餐: prod_...
```

#### **2. 三个支付链接** (https://buy.stripe.com/test_...)
```
基础套餐: https://buy.stripe.com/test_...
标准套餐: https://buy.stripe.com/test_...
高级套餐: https://buy.stripe.com/test_...
```

#### **3. Webhook签名密钥** (whsec_...)
```
在 "Developers → Webhooks" 中设置后获取
```

## 🔧 手动创建步骤（如果脚本失败）

### **手动创建基础套餐：**
```
1. 在产品页面点击 "Add product"
2. 填写：
   名称: Wedesign 基础套餐
   描述: 基础Logo设计服务，包含3个初稿方案和2次修改
   价格: $299.00
   产品ID: wedesign-basic-sandbox
3. 点击 "Save product"
4. 复制产品ID: prod_...
```

### **手动创建支付链接：**
```
1. 进入产品详情页
2. 点击 "Create payment link"
3. 配置：
   成功URL: https://wedesign-v1.vercel.app/success
   取消URL: https://wedesign-v1.vercel.app/cancel
4. 点击 "Create link"
5. 复制支付链接: https://buy.stripe.com/test_...
```

## ⚡ 立即行动清单

### **请在Stripe沙盒环境完成：**
- [ ] 运行自动化脚本创建三个产品
- [ ] 记录三个产品ID (prod_...)
- [ ] 记录三个支付链接
- [ ] 设置Webhook端点
- [ ] 获取Webhook签名密钥

### **预计时间：5-8分钟**

## 🎯 开发团队等待的信息

### **阿宝需要以下信息配置网站：**
```
1. 三个产品ID: prod_...
2. 三个支付链接: https://buy.stripe.com/test_...
3. Webhook密钥: whsec_...
```

### **配置完成后立即：**
✅ 更新网站Stripe配置
✅ 测试支付流程
✅ 验证Webhook监听
✅ 部署上线

## 📞 遇到问题？

### **常见问题：**
1. **脚本不运行**：检查是否在产品创建页面
2. **保存失败**：检查必填字段是否填写完整
3. **支付链接失败**：确保在测试模式
4. **权限问题**：确保有创建产品的权限

### **需要帮助？**
- 截图当前页面
- 描述具体问题
- 我们远程指导解决

## 🚀 最终目标

### **完成配置后：**
✅ 三个沙盒测试产品
✅ 完整的支付链接
✅ Webhook事件监听
✅ 可测试的支付系统

---

**师傅，请立即运行自动化脚本创建产品！**

**我们等待产品ID和支付链接，立即完成配置！** ⚡

**预计完成时间：今天10:50前** ⏰