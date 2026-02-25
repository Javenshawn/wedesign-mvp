const https = require('https');

console.log('🔍 检查实际网站内容...\n');

const checkSite = (url) => {
  return new Promise((resolve) => {
    https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`🌐 ${url}: ${res.statusCode} ${res.statusMessage}`);
        console.log(`📏 内容大小: ${(data.length / 1024).toFixed(1)}KB`);
        
        // 检查关键组件
        const checks = {
          hasNavbar: data.includes('Navbar') || data.includes('navbar'),
          hasHero: data.includes('Hero') || data.includes('hero'),
          hasPricing: data.includes('PricingSection') || data.includes('pricing'),
          hasDesignProcess: data.includes('DesignProcess') || data.includes('design-process'),
          hasTestimonials: data.includes('Testimonials') || data.includes('testimonials'),
          hasChatWidget: data.includes('ChatWidget') || data.includes('chat-widget'),
          hasBooking: data.includes('BookingCalendar') || data.includes('booking-calendar'),
          hasFooter: data.includes('Footer') || data.includes('footer'),
          hasTailwindClasses: data.includes('from-blue-600') || data.includes('bg-gradient'),
          hasReactComponents: data.includes('_next/static/chunks') || data.includes('__NEXT_DATA__')
        };
        
        console.log('\n📦 组件检查:');
        Object.entries(checks).forEach(([check, passed]) => {
          const checkName = check.replace('has', '').replace(/([A-Z])/g, ' $1').trim();
          console.log(`   ${passed ? '✅' : '❌'} ${checkName}`);
        });
        
        // 检查是否Next.js应用
        const isNextJS = data.includes('__NEXT_DATA__');
        console.log(`\n🚀 框架: ${isNextJS ? 'Next.js应用' : '静态HTML'}`);
        
        // 检查是否包含我们的新代码
        const hasOurCode = data.includes('DesignProcess') || data.includes('Testimonials');
        console.log(`💻 我们的代码: ${hasOurCode ? '已部署' : '未找到'}`);
        
        resolve({ data, checks, isNextJS, hasOurCode });
      });
    }).on('error', (err) => {
      console.log(`❌ ${url}: ${err.message}`);
      resolve({ data: '', checks: {}, isNextJS: false, hasOurCode: false });
    });
  });
};

(async () => {
  const urls = [
    'https://wedesign.design',
    'https://wedesign-mvp.vercel.app',
    'https://wedesign-l51nxzoun-javen-shawns-projects.vercel.app'
  ];
  
  for (const url of urls) {
    console.log(`\n📊 检查: ${url}`);
    console.log('='.repeat(50));
    
    const result = await checkSite(url);
    
    if (!result.hasOurCode) {
      console.log('\n🚨 问题: 新代码未部署！');
      console.log('   可能原因:');
      console.log('   1. Vercel缓存了旧版本');
      console.log('   2. 部署未完全完成');
      console.log('   3. DNS缓存问题');
      
      console.log('\n🔧 解决方案:');
      console.log('   1. 强制重新部署: npx vercel --prod --force');
      console.log('   2. 清除Vercel缓存');
      console.log('   3. 等待DNS传播');
    }
    
    console.log('');
  }
})();