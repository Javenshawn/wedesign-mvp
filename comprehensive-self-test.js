const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('🧪 开始全面自测试...\n');

// 1. 检查项目结构
console.log('📁 1. 项目结构检查:');
const requiredFiles = [
  'package.json',
  'next.config.js',
  'tailwind.config.ts',
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/components/Hero.tsx',
  'src/components/ChatWidget.tsx',
  'src/components/BookingCalendar.tsx',
  'src/components/DesignProcess.tsx',
  'src/components/Testimonials.tsx',
  'src/components/PricingSection.tsx'
];

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, 'wedesign-mvp', file);
  const exists = fs.existsSync(fullPath);
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// 2. 检查组件"use client"指令
console.log('\n🎯 2. 组件指令检查:');
const components = [
  'Hero.tsx',
  'ChatWidget.tsx',
  'BookingCalendar.tsx',
  'DesignProcess.tsx',
  'Testimonials.tsx',
  'PricingSection.tsx',
  'Navbar.tsx',
  'Footer.tsx',
  'TrustElements.tsx',
  'CaseStudyCard.tsx'
];

components.forEach(component => {
  const filePath = path.join(__dirname, 'wedesign-mvp', 'src', 'components', component);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasUseClient = content.includes("'use client'");
    console.log(`   ${hasUseClient ? '✅' : '❌'} ${component}: ${hasUseClient ? '有指令' : '无指令'}`);
  }
});

// 3. 检查页面动态渲染
console.log('\n⚡ 3. 动态渲染检查:');
const pagePath = path.join(__dirname, 'wedesign-mvp', 'src', 'app', 'page.tsx');
if (fs.existsSync(pagePath)) {
  const pageContent = fs.readFileSync(pagePath, 'utf8');
  const hasDynamic = pageContent.includes('dynamic = \'force-dynamic\'');
  console.log(`   ${hasDynamic ? '✅' : '❌'} 主页: ${hasDynamic ? '动态渲染' : '静态渲染'}`);
}

// 4. 检查Tailwind配置
console.log('\n🎨 4. Tailwind配置检查:');
const tailwindPath = path.join(__dirname, 'wedesign-mvp', 'tailwind.config.ts');
if (fs.existsSync(tailwindPath)) {
  const tailwindContent = fs.readFileSync(tailwindPath, 'utf8');
  const hasColors = tailwindContent.includes('primary:') && tailwindContent.includes('secondary:');
  const hasGradients = tailwindContent.includes('gradient-primary');
  console.log(`   ${hasColors ? '✅' : '❌'} 颜色系统`);
  console.log(`   ${hasGradients ? '✅' : '❌'} 渐变系统`);
}

// 5. 检查环境变量
console.log('\n🔧 5. 环境变量检查:');
const envPath = path.join(__dirname, 'wedesign-mvp', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasStripe = envContent.includes('STRIPE_');
  const hasSupabase = envContent.includes('SUPABASE_');
  console.log(`   ${hasStripe ? '✅' : '❌'} Stripe配置`);
  console.log(`   ${hasSupabase ? '✅' : '❌'} Supabase配置`);
}

// 6. 检查API路由
console.log('\n🌐 6. API路由检查:');
const apiRoutes = [
  'src/app/api/checkout/route.ts',
  'src/app/api/webhook/route.ts',
  'src/app/api/orders/route.ts'
];

apiRoutes.forEach(route => {
  const fullPath = path.join(__dirname, 'wedesign-mvp', route);
  const exists = fs.existsSync(fullPath);
  console.log(`   ${exists ? '✅' : '❌'} ${route.split('/').pop()}`);
});

// 7. 检查部署配置
console.log('\n🚀 7. 部署配置检查:');
const vercelPath = path.join(__dirname, 'wedesign-mvp', 'vercel.json');
const nextConfigPath = path.join(__dirname, 'wedesign-mvp', 'next.config.js');

console.log(`   ${fs.existsSync(vercelPath) ? '✅' : '❌'} Vercel配置`);
console.log(`   ${fs.existsSync(nextConfigPath) ? '✅' : '❌'} Next.js配置`);

// 8. 总结
console.log('\n' + '='.repeat(50));
console.log('📊 自测试总结:');

const allChecks = [
  // 项目结构
  ...requiredFiles.map(f => fs.existsSync(path.join(__dirname, 'wedesign-mvp', f))),
  // 组件指令
  ...components.map(c => {
    const filePath = path.join(__dirname, 'wedesign-mvp', 'src', 'components', c);
    if (!fs.existsSync(filePath)) return false;
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes("'use client'");
  }),
  // 动态渲染
  fs.existsSync(pagePath) && fs.readFileSync(pagePath, 'utf8').includes('dynamic = \'force-dynamic\''),
  // Tailwind配置
  fs.existsSync(tailwindPath) && fs.readFileSync(tailwindPath, 'utf8').includes('primary:'),
  // 环境变量
  fs.existsSync(envPath) && fs.readFileSync(envPath, 'utf8').includes('STRIPE_'),
  // API路由
  ...apiRoutes.map(r => fs.existsSync(path.join(__dirname, 'wedesign-mvp', r))),
  // 部署配置
  fs.existsSync(vercelPath),
  fs.existsSync(nextConfigPath)
];

const passed = allChecks.filter(Boolean).length;
const total = allChecks.length;
const percentage = Math.round((passed / total) * 100);

console.log(`   通过: ${passed}/${total} (${percentage}%)`);

if (percentage >= 90) {
  console.log('\n🎉 自测试通过！项目结构完整，配置正确。');
  console.log('\n🚀 建议下一步:');
  console.log('   1. 等待Vercel部署完成');
  console.log('   2. 访问: https://wedesign.design');
  console.log('   3. 测试所有功能');
  console.log('   4. 检查响应式设计');
} else {
  console.log('\n⚠️ 自测试未完全通过，需要修复。');
  console.log('\n🔧 需要检查:');
  console.log('   1. 缺少的文件');
  console.log('   2. 组件指令');
  console.log('   3. 环境变量');
  console.log('   4. API路由');
}

console.log('\n📋 测试报告生成完成。');