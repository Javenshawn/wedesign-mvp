// 测试新设计系统
const https = require('https');

console.log('🎨 测试新设计系统...');
console.log('============================\n');

async function testDesignSystem() {
  const url = 'https://wedesign.design';
  
  return new Promise((resolve) => {
    console.log(`🔍 测试网站: ${url}`);
    
    const req = https.get(url, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`📡 状态: ${res.statusCode} ${res.statusMessage}`);
        
        // 检查设计系统元素
        const checks = {
          hasNewFonts: data.includes('Poppins') || data.includes('Inter'),
          hasGradientClasses: data.includes('primary-gradient-text') || data.includes('primary-gradient-bg'),
          hasNewColors: data.includes('hsl(var(--primary)') || data.includes('hsl(35'),
          hasNewComponents: data.includes('font-heading') || data.includes('card-hover'),
          hasAnimations: data.includes('animate-') || data.includes('transition-all'),
          hasNewNavbar: data.includes('sticky top-0') && data.includes('backdrop-blur'),
          hasNewFooter: data.includes('contact@wedesign.design') || data.includes('Book Consultation')
        };
        
        console.log('\n✅ 设计系统检查:');
        Object.entries(checks).forEach(([check, passed]) => {
          console.log(`   ${passed ? '✅' : '❌'} ${check.replace('has', '').replace(/([A-Z])/g, ' $1').trim()}`);
        });
        
        const passedCount = Object.values(checks).filter(Boolean).length;
        const totalCount = Object.keys(checks).length;
        
        console.log(`\n📊 通过率: ${passedCount}/${totalCount} (${Math.round((passedCount/totalCount)*100)}%)`);
        
        if (passedCount === totalCount) {
          console.log('\n🎉 设计系统迁移成功!');
          console.log('   网站已更新为新的设计规范。');
        } else {
          console.log('\n⚠️  设计系统部分迁移成功');
          console.log('   可能需要重新部署才能看到完整效果。');
        }
        
        resolve(checks);
      });
    });
    
    req.on('error', (error) => {
      console.log(`❌ 测试失败: ${error.message}`);
      resolve({});
    });
    
    req.on('timeout', () => {
      console.log('⏰ 测试超时');
      req.destroy();
      resolve({});
    });
    
    req.end();
  });
}

// 运行测试
testDesignSystem().then(checks => {
  console.log('\n💡 建议:');
  console.log('   1. 访问 https://wedesign.design 查看新设计');
  console.log('   2. 检查导航栏、页脚和Logo效果');
  console.log('   3. 测试移动端响应式设计');
  console.log('   4. 验证支付流程仍然正常工作');
  
  console.log('\n🚀 下一步:');
  console.log('   开始第二阶段 - 核心页面重构');
  console.log('   包括: 首页Hero区域、定价卡片、案例展示优化');
});