const https = require('https');

console.log('🔍 立即检查网站状态...\n');

const checkWebsite = (url) => {
  return new Promise((resolve) => {
    https.get(url, { timeout: 5000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`🌐 ${url}: ${res.statusCode} ${res.statusMessage}`);
        
        // 检查关键元素
        const checks = {
          hasNewHero: data.includes('Professional Designs That') || data.includes('Grow Your Business'),
          hasBrandSystem: data.includes('brand-system') || data.includes('primary-500'),
          hasNewComponents: data.includes('DesignProcess') || data.includes('Testimonials'),
          hasChatWidget: data.includes('ChatWidget') || data.includes('MessageCircle'),
          hasBooking: data.includes('BookingCalendar') || data.includes('Schedule Free Consultation'),
          isDeployed: data.includes('Professional Designs That') && data.includes('DesignProcess')
        };
        
        console.log('   ✅ 新设计元素:');
        Object.entries(checks).forEach(([check, passed]) => {
          const checkName = check.replace('has', '').replace('is', '').replace(/([A-Z])/g, ' $1').trim();
          console.log(`      ${passed ? '✅' : '❌'} ${checkName}`);
        });
        
        resolve(checks);
      });
    }).on('error', () => {
      console.log(`❌ ${url}: 无法访问`);
      resolve({});
    }).on('timeout', () => {
      console.log(`⏰ ${url}: 检查超时`);
      resolve({});
    });
  });
};

(async () => {
  console.log('📊 检查多个URL...');
  console.log('============================\n');
  
  const urls = [
    'https://wedesign.design',
    'https://wedesign-mvp.vercel.app',
    'https://wedesign-gqi2afgvr-javen-shawns-projects.vercel.app'
  ];
  
  let anyDeployed = false;
  
  for (const url of urls) {
    const checks = await checkWebsite(url);
    if (checks.isDeployed) {
      anyDeployed = true;
      console.log(`\n🎉 ${url} 已部署新设计！`);
    }
    console.log('');
  }
  
  if (!anyDeployed) {
    console.log('🚨 问题诊断:');
    console.log('   1. Vercel可能仍在构建中 (通常需要3-5分钟)');
    console.log('   2. 可能有缓存问题 (浏览器/CDN缓存)');
    console.log('   3. 部署可能失败 (需要检查构建日志)');
    
    console.log('\n🔧 解决方案:');
    console.log('   1. 强制刷新浏览器: Ctrl+Shift+R');
    console.log('   2. 清除浏览器缓存');
    console.log('   3. 等待几分钟再试');
    console.log('   4. 检查Vercel部署日志');
    
    console.log('\n🚀 立即行动:');
    console.log('   1. 访问: https://vercel.com/javenshawn/wedesign-mvp');
    console.log('   2. 查看最新部署状态');
    console.log('   3. 检查构建日志');
  }
})();