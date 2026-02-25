const fs = require('fs');
const path = require('path');

console.log('🔍 检查组件"use client"指令...\n');

const componentsDir = path.join(__dirname, 'wedesign-mvp', 'src', 'components');
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

let allHaveClient = true;

components.forEach(component => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasUseClient = content.includes("'use client'") || content.includes('"use client"');
    
    console.log(`${hasUseClient ? '✅' : '❌'} ${component}: ${hasUseClient ? '有use client' : '缺少use client'}`);
    
    if (!hasUseClient) {
      allHaveClient = false;
      console.log(`   🚨 需要添加: 'use client'`);
    }
  } else {
    console.log(`⚠️ ${component}: 文件不存在`);
  }
});

console.log('\n' + '='.repeat(50));

if (allHaveClient) {
  console.log('✅ 所有组件都有"use client"指令');
  console.log('\n🔧 其他可能问题:');
  console.log('   1. 组件导入路径错误');
  console.log('   2. Tailwind CSS配置问题');
  console.log('   3. Vercel缓存问题');
  console.log('   4. 浏览器缓存问题');
} else {
  console.log('🚨 有些组件缺少"use client"指令');
  console.log('\n🔧 解决方案:');
  console.log('   1. 在每个组件文件开头添加: \'use client\'');
  console.log('   2. 重新构建和部署');
  console.log('   3. 清除Vercel缓存');
}

console.log('\n🚀 立即修复步骤:');
console.log('   1. 检查所有组件文件');
console.log('   2. 确保都有\'use client\'');
console.log('   3. 重新提交代码');
console.log('   4. 强制重新部署');