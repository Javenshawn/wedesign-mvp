const https = require('https');

console.log('⏳ 等待部署完成...');
console.log('   预计需要2-3分钟\n');

// 等待2分钟后检查
setTimeout(() => {
  console.log('🔍 开始检查部署状态...\n');
  
  const url = 'https://wedesign.design';
  
  https.get(url, { timeout: 5000 }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`🌐 网站状态: ${res.statusCode} ${res.statusMessage}`);
      
      // 检查新设计元素
      const checks = {
        hasNewHero: data.includes('Professional Designs That') || data.includes('Grow Your Business'),
        hasDesignProcess: data.includes('DesignProcess') || data.includes('OUR PROCESS'),
        hasTestimonials: data.includes('Testimonials') || data.includes('CLIENT SUCCESS'),
        hasChatWidget: data.includes('ChatWidget') || data.includes('Design Assistant'),
        hasBooking: data.includes('BookingCalendar') || data.includes('Book Consultation'),
        hasNewDesign: data.includes('gradient-primary') || data.includes('from-blue-600')
      };
      
      console.log('\n✅ 新功能检查:');
      Object.entries(checks).forEach(([check, passed]) => {
        const checkName = check.replace('has', '').replace(/([A-Z])/g, ' $1').trim();
        console.log(`   ${passed ? '✅' : '❌'} ${checkName}`);
      });
      
      const passedCount = Object.values(checks).filter(Boolean).length;
      const totalCount = Object.keys(checks).length;
      
      console.log(`\n📊 部署完成度: ${passedCount}/${totalCount} (${Math.round((passedCount/totalCount)*100)}%)`);
      
      if (passedCount >= 4) {
        console.log('\n🎉 新设计已成功部署！');
        console.log('   可以访问: https://wedesign.design');
        console.log('   查看: 专业设计、聊天支持、预约系统');
      } else {
        console.log('\n⏳ 部署可能仍在进行中...');
        console.log('   建议:');
        console.log('   1. 等待几分钟再刷新');
        console.log('   2. 清除浏览器缓存 (Ctrl+Shift+R)');
        console.log('   3. 检查Vercel部署状态');
      }
    });
  }).on('error', () => {
    console.log('❌ 无法访问网站');
    console.log('   可能仍在部署中，请稍后再试');
  }).on('timeout', () => {
    console.log('⏰ 检查超时');
    console.log('   网站可能正在启动，请稍后再试');
  });
}, 120000); // 等待2分钟