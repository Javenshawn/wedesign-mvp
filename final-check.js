const https = require('https');

console.log('🚀 检查最新部署...\n');

const checkDeployment = (url) => {
  return new Promise((resolve) => {
    const req = https.get(url, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Cache-Control': 'no-cache'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`🌐 ${url}: ${res.statusCode} ${res.statusMessage}`);
        
        // 详细检查
        const checks = {
          isNextJS: data.includes('__NEXT_DATA__'),
          hasHero: data.includes('Professional Designs That') || data.includes('Grow Your Business'),
          hasChat: data.includes('ChatWidget') || data.includes('Design Assistant'),
          hasBooking: data.includes('BookingCalendar') || data.includes('Book Consultation'),
          hasDesignProcess: data.includes('DesignProcess') || data.includes('OUR PROCESS'),
          hasTestimonials: data.includes('Testimonials') || data.includes('CLIENT SUCCESS'),
          hasPricing: data.includes('PricingSection') || data.includes('Choose Your Plan'),
          hasNewDesign: data.includes('from-blue-600') || data.includes('gradient-primary'),
          hasDynamic: data.includes('force-dynamic') || data.includes('dynamic'),
          isDynamicRendered: !data.includes('<!--') || data.includes('__NEXT_DATA__')
        };
        
        console.log('\n🔍 详细检查:');
        Object.entries(checks).forEach(([check, passed]) => {
          const checkName = check.replace('has', '').replace('is', '').replace(/([A-Z])/g, ' $1').trim();
          console.log(`   ${passed ? '✅' : '❌'} ${checkName}`);
        });
        
        // 检查是否包含我们的组件代码
        const componentChecks = {
          Hero: data.includes('Hero') && data.includes('from-blue-600'),
          ChatWidget: data.includes('ChatWidget') && data.includes('MessageCircle'),
          BookingCalendar: data.includes('BookingCalendar') && data.includes('Calendar'),
          DesignProcess: data.includes('DesignProcess') && data.includes('6-step'),
          Testimonials: data.includes('Testimonials') && data.includes('client'),
          PricingSection: data.includes('PricingSection') && data.includes('price_')
        };
        
        console.log('\n🎯 组件检查:');
        Object.entries(componentChecks).forEach(([component, passed]) => {
          console.log(`   ${passed ? '✅' : '❌'} ${component}`);
        });
        
        resolve({ 
          success: checks.isNextJS && checks.hasHero,
          checks,
          componentChecks 
        });
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${url}: ${err.message}`);
      resolve({ success: false, checks: {}, componentChecks: {} });
    });
    
    req.on('timeout', () => {
      console.log(`⏰ ${url}: 请求超时`);
      req.destroy();
      resolve({ success: false, checks: {}, componentChecks: {} });
    });
  });
};

(async () => {
  console.log('📊 检查主域名...');
  const result1 = await checkDeployment('https://wedesign.design');
  
  console.log('\n📊 检查Vercel部署...');
  const result2 = await checkDeployment('https://wedesign-mvp.vercel.app');
  
  console.log('\n📊 检查最新部署...');
  const result3 = await checkDeployment('https://wedesign-54x83cb93-javen-shawns-projects.vercel.app');
  
  // 总结
  console.log('\n' + '='.repeat(50));
  console.log('📈 部署状态总结:');
  
  const allResults = [result1, result2, result3];
  const successful = allResults.filter(r => r.success).length;
  
  if (successful >= 2) {
    console.log('🎉 新设计已成功部署！');
    console.log('\n🚀 现在可以:');
    console.log('   1. 访问: https://wedesign.design');
    console.log('   2. 查看专业设计系统');
    console.log('   3. 测试聊天功能');
    console.log('   4. 测试预约系统');
    console.log('   5. 查看客户案例');
    
    console.log('\n🔧 如果仍然看不到变化:');
    console.log('   1. 强制刷新: Ctrl+Shift+R');
    console.log('   2. 清除浏览器缓存');
    console.log('   3. 等待DNS传播 (最多24小时)');
    console.log('   4. 使用隐身模式访问');
  } else {
    console.log('⚠️ 部署可能仍有问题');
    console.log('\n🔧 建议:');
    console.log('   1. 等待几分钟再试');
    console.log('   2. 检查Vercel部署日志');
    console.log('   3. 确保所有组件都有"use client"');
    console.log('   4. 检查组件导入路径');
  }
})();