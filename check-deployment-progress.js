// 检查部署进度
const https = require('https');

console.log('🚀 检查部署进度...');
console.log('============================\n');

async function checkDeployment() {
  const url = 'https://wedesign.design';
  
  return new Promise((resolve) => {
    const req = https.get(url, { 
      timeout: 5000,
      headers: {
        'User-Agent': 'Deployment-Check/2.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`🌐 网站状态: ${res.statusCode} ${res.statusMessage}`);
        
        // 检查新设计元素
        const checks = {
          hasNewHero: data.includes('primary-gradient-text') && data.includes('font-heading'),
          hasNewNavbar: data.includes('sticky top-0') && data.includes('backdrop-blur'),
          hasNewFooter: data.includes('contact@wedesign.design'),
          hasAnimations: data.includes('framer-motion') || data.includes('animate-'),
          hasNewComponents: data.includes('Button') && data.includes('Card'),
          isDeployed: data.includes('primary-gradient-text') // 关键检查
        };
        
        console.log('\n✅ 部署检查:');
        Object.entries(checks).forEach(([check, passed]) => {
          const checkName = check.replace('has', '').replace('is', '').replace(/([A-Z])/g, ' $1').trim();
          console.log(`   ${passed ? '✅' : '⏳'} ${checkName}`);
        });
        
        const passedCount = Object.values(checks).filter(Boolean).length;
        const totalCount = Object.keys(checks).length;
        
        console.log(`\n📊 部署进度: ${passedCount}/${totalCount} (${Math.round((passedCount/totalCount)*100)}%)`);
        
        if (checks.isDeployed) {
          console.log('\n🎉 新设计已部署!');
          console.log('   可以访问 https://wedesign.design 查看新界面');
        } else {
          console.log('\n⏳ 部署进行中...');
          console.log('   Vercel可能仍在构建，通常需要3-5分钟');
          console.log('   可以继续开发，部署会自动完成');
        }
        
        resolve(checks);
      });
    });
    
    req.on('error', () => {
      console.log('❌ 无法访问网站');
      resolve({});
    });
    
    req.on('timeout', () => {
      console.log('⏰ 检查超时');
      req.destroy();
      resolve({});
    });
    
    req.end();
  });
}

checkDeployment().then(() => {
  console.log('\n💡 建议:');
  console.log('   1. 如果新设计已部署，测试响应式布局');
  console.log('   2. 如果仍在构建，继续开发其他页面');
  console.log('   3. 定期检查 https://wedesign.design');
  
  console.log('\n🚀 下一步工作:');
  console.log('   第三阶段: 案例页面优化');
  console.log('   包括: 案例卡片设计、筛选功能、详情模态框');
});