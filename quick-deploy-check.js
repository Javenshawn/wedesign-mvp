// 快速部署检查
const https = require('https');

console.log('🔍 快速部署检查...\n');

https.get('https://wedesign.design', { timeout: 3000 }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const hasNewDesign = data.includes('primary-gradient-text') || 
                        data.includes('framer-motion') ||
                        data.includes('font-heading');
    
    console.log(`🌐 网站状态: ${res.statusCode} ${res.statusMessage}`);
    console.log(`🎨 新设计: ${hasNewDesign ? '✅ 已部署' : '⏳ 构建中'}`);
    
    if (hasNewDesign) {
      console.log('\n🎉 恭喜！新设计已生效！');
      console.log('   可以访问: https://wedesign.design');
      console.log('   查看: 新导航栏、Hero区域、案例页面');
    } else {
      console.log('\n⏳ 仍在构建中...');
      console.log('   Vercel部署通常需要3-5分钟');
      console.log('   可以稍后刷新页面查看');
    }
    
    console.log('\n💡 建议:');
    console.log('   1. 等待几分钟后刷新页面');
    console.log('   2. 测试移动端响应式');
    console.log('   3. 验证支付功能仍然工作');
  });
}).on('error', () => {
  console.log('❌ 无法访问网站');
}).on('timeout', () => {
  console.log('⏰ 检查超时');
});