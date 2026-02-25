# Wedesign 主网站项目

## 🎯 项目概述
专业设计服务平台 - www.wedesign.design

## 🚀 已验证模块集成

### 核心支付闭环 ✅
- 首页套餐展示与选择
- Stripe支付集成
- 订单自动创建
- 后台订单管理

### 成功案例展示 ✅
- 6个详细案例展示
- 数据库驱动内容
- 响应式设计
- 客户评价系统

### 管理工具 ✅
- 数据库一键设置
- 订单管理后台
- 案例数据管理

### 基础架构 ✅
- Next.js 14 + TypeScript
- Supabase PostgreSQL
- Tailwind CSS
- Vercel部署

---

## 📁 项目结构

```
wedesign-main/
├── src/
│   ├── app/
│   │   ├── (marketing)/          # 营销页面
│   │   │   ├── page.tsx          # 首页
│   │   │   ├── cases/            # 成功案例
│   │   │   └── pricing/          # 价格页面
│   │   ├── api/
│   │   │   ├── checkout/         # 支付API
│   │   │   ├── webhook/          # Stripe Webhook
│   │   │   └── admin/            # 管理API
│   │   ├── admin/                # 管理后台
│   │   │   ├── page.tsx          # 订单管理
│   │   │   └── setup/            # 数据库设置
│   │   └── layout.tsx            # 根布局
│   ├── components/
│   │   ├── Navbar.tsx            # 导航栏
│   │   ├── Hero.tsx              # 英雄展示区
│   │   ├── PricingSection.tsx    # 套餐展示
│   │   ├── CaseStudyCard.tsx     # 案例卡片
│   │   └── Footer.tsx            # 页脚
│   └── lib/
│       ├── supabase.ts           # Supabase客户端
│       └── stripe.ts             # Stripe配置
├── public/                       # 静态资源
├── .env.local                    # 环境变量
├── package.json                  # 依赖配置
└── vercel.json                   # 部署配置
```

---

## 🔧 技术栈

### 前端框架
- **Next.js 14** - React框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式系统
- **React** - UI组件

### 后端服务
- **Supabase** - 数据库 + 认证
- **Stripe** - 支付处理
- **Vercel** - 部署 + 边缘函数

### 开发工具
- **Git** - 版本控制
- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **GitHub Actions** - CI/CD

---

## 🚀 快速开始

### 1. 环境设置
```bash
# 克隆项目
git clone https://github.com/Javenshawn/wedesign-main.git

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
```

### 2. 开发运行
```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 3. 生产部署
```bash
# 构建生产版本
npm run build

# 部署到Vercel
vercel --prod
```

---

## 📊 业务流程

### 客户旅程
```
1. 访问 www.wedesign.design
2. 浏览成功案例建立信任
3. 选择适合的套餐
4. 输入邮箱并支付
5. 收到订单确认
6. 设计师开始工作
7. 交付设计成果
8. 提供评价反馈
```

### 管理流程
```
1. 新订单自动创建
2. 后台查看订单详情
3. 分配设计师工作
4. 跟踪项目进度
5. 交付成果给客户
6. 收集客户评价
7. 添加到成功案例库
```

---

## 🔐 环境变量

### 必需配置
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# 应用
NEXT_PUBLIC_APP_URL=https://wedesign.design
NEXT_PUBLIC_SITE_NAME=Wedesign
```

---

## 📈 监控与分析

### 性能监控
- **Vercel Analytics** - 网站性能
- **Sentry** - 错误追踪
- **Google Analytics** - 用户行为

### 业务指标
- **订单转化率**
- **平均订单价值**
- **客户满意度**
- **案例展示效果**

---

## 🔄 持续集成

### GitHub Actions工作流
```yaml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📞 支持与维护

### 技术支持
- **文档**: docs.wedesign.design
- **邮箱**: support@wedesign.design
- **状态**: status.wedesign.design

### 维护计划
- **每日**: 检查订单和支付状态
- **每周**: 更新成功案例
- **每月**: 性能优化和功能迭代
- **每季**: 业务分析和策略调整

---

## 🎯 成功标准

### 技术指标
- ✅ 页面加载时间 < 2秒
- ✅ 支付成功率 > 99%
- ✅ 零关键错误
- ✅ 100%正常运行时间

### 业务指标
- ✅ 每月订单增长
- ✅ 客户满意度 > 4.5/5
- ✅ 案例库持续更新
- ✅ 收入稳定增长

---

**极简支付闭环MVP已验证，准备投入生产！** 🚀