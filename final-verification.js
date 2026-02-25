const https = require('https');

console.log('🎯 最终验证脚本');
console.log('   等待部署完成并验证所有功能...\n');

// 等待3分钟让部署完成
setTimeout(() => {
  console.log('⏰ 3分钟已过，开始最终验证...\n');
  
  const testUrl = 'https://wedesign.design';
  
  console.log(`🔍 测试: ${testUrl}`);
  console.log('='.repeat(50));
  
  const req = https.get(testUrl, { 
    timeout: 15000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`📊 响应: ${res.statusCode} ${res.statusMessage}`);
      console.log(`📏 大小: ${(data.length / 1024).toFixed(1)}KB`);
      
      // 关键功能检查
      const criticalChecks = {
        isNextJS: data.includes('__NEXT_DATA__'),
        hasHeroSection: data.includes('Professional Designs That') || data.includes('Grow Your Business'),
        hasChatButton: data.includes('ChatWidget') || data.includes('MessageCircle') || data.includes('Design Assistant'),
        hasBookingButton: data.includes('BookingCalendar') || data.includes('Book Consultation'),
        hasPricing: data.includes('PricingSection') || data.includes('Choose Your Plan'),
        hasDesignProcess: data.includes('DesignProcess') || data.includes('OUR PROCESS'),
        hasTestimonials: data.includes('Testimonials') || data.includes('CLIENT SUCCESS'),
        hasTrustElements: data.includes('TrustElements') || data.includes('SECURE PAYMENT'),
        hasNavbar: data.includes('Navbar') || data.includes('Case Studies'),
        hasFooter: data.includes('Footer') || data.includes('© 2024 Wedesign')
      };
      
      console.log('\n🎯 关键功能检查:');
      let passed = 0;
      Object.entries(criticalChecks).forEach(([check, passedCheck]) => {
        const checkName = check.replace('has', '').replace('is', '').replace(/([A-Z])/g, ' $1').trim();
        const icon = passedCheck ? '✅' : '❌';
        console.log(`   ${icon} ${checkName}`);
        if (passedCheck) passed++;
      });
      
      const total = Object.keys(criticalChecks).length;
      const percentage = Math.round((passed / total) * 100);
      
      console.log(`\n📈 完成度: ${passed}/${total} (${percentage}%)`);
      
      if (passed >= 7) {
        console.log('\n🎉 🎉 🎉 恭喜！网站已成功部署！ 🎉 🎉 🎉');
        console.log('\n🚀 现在可以:');
        console.log('   1. 访问: https://wedesign.design');
        console.log('   2. 查看专业设计系统');
        console.log('   3. 点击右下角聊天按钮');
        console.log('   4. 点击预约咨询按钮');
        console.log('   5. 查看客户案例');
        console.log('   6. 测试支付功能');
        
        console.log('\n🔧 如果仍然看不到变化:');
        console.log('   1. 强制刷新: Ctrl+Shift+R (Windows)');
        console.log('   2. 清除浏览器缓存');
        console.log('   3. 使用隐身模式访问');
        console.log('   4. 等待DNS传播 (最多24小时)');
        
        console.log('\n📱 测试链接:');
        console.log('   • 主站: https://wedesign.design');
        console.log('   • 案例: https://wedesign.design/cases');
        console.log('   • 后台: https://wedesign.design/admin');
        
      } else {
        console.log('\n⚠️ 部署可能仍有问题');
        console.log('\n🔧 建议操作:');
        console.log('   1. 检查Vercel部署日志');
        console.log('   2. 确保所有组件都有"use client"');
        console.log('   3. 检查组件导入路径');
        console.log('   4. 清除Vercel项目缓存');
        console.log('   5. 重新部署');
      }
      
      // 额外检查
      console.log('\n🔍 额外检查:');
      console.log(`   ${data.includes('use client') ? '✅' : '❌'} 组件有use client指令`);
      console.log(`   ${data.includes('dynamic') ? '✅' : '❌'} 页面有动态渲染`);
      console.log(`   ${data.includes('Stripe') ? '✅' : '❌'} Stripe集成`);
      console.log(`   ${data.includes('Supabase') ? '✅' : '❌'} Supabase集成`);
      
    });
  });
  
  req.on('error', (err) => {
    console.log(`❌ 请求错误: ${err.message}`);
    console.log('\n🔧 可能原因:');
    console.log('   1. 网站仍在部署中');
    console.log('   2. DNS解析问题');
    console.log('   3. 网络连接问题');
  });
  
  req.on('timeout', () => {
    console.log('⏰ 请求超时');
    console.log('   网站可能正在启动，请稍后再试');
  });
  
}, 180000); // 等待3分钟