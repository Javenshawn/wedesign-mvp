# Stripe快速设置指南

## 🎯 师傅，请按以下步骤操作：

### **步骤1：打开Stripe控制台**
- 确保在已登录的Chrome浏览器中
- 网址：https://dashboard.stripe.com

### **步骤2：运行自动化脚本**
1. 按 **F12** 打开开发者工具
2. 切换到 **Console** 标签页
3. 复制以下代码到控制台：

```javascript
// 粘贴整个stripe-real-automation.js内容
// 或者直接运行：
fetch('https://raw.githubusercontent.com/your-repo/stripe-real-automation.js')
  .then(r => r.text())
  .then(code => eval(code))
```

4. 在控制台输入：`stripeAutomation.run()`

### **步骤3：脚本将自动执行**
```
✅ 创建三个套餐产品
✅ 获取API密钥  
✅ 设置Webhook端点
✅ 生成完整配置
```

### **步骤4：获取配置信息**
脚本完成后会输出：
```
🎉 Stripe配置完成！
📋 复制以下配置给开发团队：
{
  "STRIPE_PUBLISHABLE_KEY": "pk_test_...",
  "STRIPE_SECRET_KEY": "sk_test_...", 
  "STRIPE_WEBHOOK_SECRET": "whsec_...",
  "PRODUCT_IDS": {
    "PRODUCT_1": "prod_...",
    "PRODUCT_2": "prod_...",
    "PRODUCT_3": "prod_..."
  }
}
```

## 🔧 备用方案：手动操作

如果自动化脚本失败，请手动操作：

### **手动创建产品**：
1. 点击左侧菜单 **Products**
2. 点击 **Add product**
3. 填写：
   - Name: `Wedesign 基础套餐`
   - Description: `基础Logo设计服务`
   - Price: `$299.00`
4. 点击 **Save product**
5. 重复创建另外两个套餐

### **手动获取API密钥**：
1. 点击 **Developers** → **API keys**
2. 复制：
   - Publishable key (测试模式)
   - Secret key (点击"Reveal test key")

### **手动设置Webhook**：
1. 点击 **Developers** → **Webhooks**
2. 点击 **Add endpoint**
3. 填写：
   - Endpoint URL: `https://wedesign-v1.vercel.app/api/stripe-webhook`
   - 选择事件：`checkout.session.completed` 等
4. 点击 **Add endpoint**
5. 复制 **Signing secret**

## ⚡ 立即行动

**请运行自动化脚本或手动操作，获取以下6个关键信息：**

1. `pk_test_...` - Publishable key
2. `sk_test_...` - Secret key  
3. `whsec_...` - Webhook签名密钥
4. `prod_...` - 基础套餐产品ID
5. `prod_...` - 标准套餐产品ID
6. `prod_...` - 高级套餐产品ID

## 🚀 开发团队等待中

阿宝已准备好代码，等待配置信息：
- ✅ Stripe API集成代码完成
- ✅ Webhook处理器完成  
- ✅ 套餐页面完成
- ✅ 支付流程完成

**只差师傅的Stripe配置信息！**

## 📞 遇到问题？

1. **脚本不运行**：检查是否已登录Stripe
2. **元素找不到**：刷新页面后重试
3. **权限问题**：确保有创建产品的权限
4. **其他问题**：截图发给我们

**师傅，请立即运行脚本或手动操作！** ⚡