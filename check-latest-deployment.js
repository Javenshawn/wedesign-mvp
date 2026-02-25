const https = require('https');

console.log('🔍 检查最新部署的实际内容...\n');

const checkDeployment = (url) => {
  return new Promise((resolve) => {
    console.log(`📊 检查: ${url}`);
    
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
        console.log(`  状态: ${res.statusCode} ${res.statusMessage}`);
        console.log(`  大小: ${(data.length / 1024).toFixed(1)}KB`);
        
        // 检查是否是Next.js应用
        const isNextJS = data.includes('__NEXT_DATA__');
        console.log(`  Next.js: ${isNextJS ? '✅ 是' : '❌ 否'}`);
        
        // 检查我们的组件
        const checks = {
          hasHero: data.includes('Hero') || data.includes('Professional Designs That'),
          hasChat: data.includes('ChatWidget') || data.includes('MessageCircle'),
          hasBooking: data.includes('BookingCalendar') || data.includes('Book Consultation'),
          hasDesignProcess: data.includes('DesignProcess') || data.includes('OUR PROCESS'),
          hasTestimonials: data.includes('Testimonials') || data.includes('CLIENT SUCCESS'),
          hasPricing: data.includes('PricingSection') || data.includes('Choose Your Plan'),
          hasNewDesign: data.includes('from-blue-600') || data.includes('gradient-primary'),
          hasOurCode: data.includes('DesignProcess') && data.includes('Testimonials')
        };
        
        console.log('\n  组件检查:');
        Object.entries(checks).forEach(([check, passed]) => {
          const checkName = check.replace('has', '').replace(/([A-Z])/g, ' $1').trim();
          console.log(`    ${passed ? '✅' : '❌'} ${checkName}`);
        });
        
        resolve({ url, isNextJS, checks, data });
      });
    });
    
    req.on('error', (err) => {
      console.log(`  ❌ 错误: ${err.message}`);
      resolve({ url, isNextJS: false, checks: {}, data: '' });
    });
    
    req.on('timeout', () => {
      console.log('  ⏰ 超时');
      resolve({ url, isNextJS: false, checks: {}, data: '' });
    });
  });
};

(async () => {
  // 检查最新部署
  const latestUrl = 'https://wedesign-fowi1wuxj-javen-shawns-projects.vercel.app';
  const result = await checkDeployment(latestUrl);
  
  console.log('\n' + '='.repeat(50));
  
  if (!result.isNextJS) {
    console.log('🚨 问题: 部署的不是Next.js应用！');
    console.log('   这意味着我们的React组件没有被正确构建。');
    
    console.log('\n🔍 可能原因:');
    console.log('   1. Vercel构建配置错误');
    console.log('   2. package.json脚本问题');
    console.log('   3. Next.js版本兼容性问题');
    console.log('   4. 构建过程被中断');
    
    console.log('\n🔧 立即检查:');
    console.log('   1. 检查Vercel项目设置');
    console.log('   2. 查看构建日志详情');
    console.log('   3. 检查package.json的build脚本');
    console.log('   4. 检查next.config.js配置');
  } else if (!result.checks.hasOurCode) {
    console.log('⚠️ 问题: Next.js应用但缺少我们的组件');
    console.log('   组件可能没有正确导入或渲染。');
  } else {
    console.log('✅ 部署正常！包含所有组件。');
  }
  
  // 检查主域名
  console.log('\n🌐 检查主域名: wedesign.design');
  const mainResult = await checkDeployment('https://wedesign.design');
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 总结:');
  console.log(`   最新部署: ${result.isNextJS ? 'Next.js应用' : '静态HTML'}`);
  console.log(`   主域名: ${mainResult.isNextJS ? 'Next.js应用' : '静态HTML'}`);
  console.log(`   组件部署: ${result.checks.hasOurCode ? '✅ 已包含' : '❌ 未包含'}`);
  
  if (!result.checks.hasOurCode) {
    console.log('\n🚀 立即行动:');
    console.log('   1. 访问Vercel控制台查看构建日志');
    console.log('   2. 检查GitHub仓库代码是否正确');
    console.log('   3. 手动触发重新部署');
    console.log('   4. 检查环境变量配置');
  }
})();