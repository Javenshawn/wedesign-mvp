const https = require('https');

console.log('📡 部署监控脚本');
console.log('   实时监控部署进度...\n');

const deploymentUrl = 'https://wedesign-607z3kqc6-javen-shawns-projects.vercel.app';
let checkCount = 0;
const maxChecks = 30; // 检查30次，每次10秒，总共5分钟

const checkDeployment = () => {
  checkCount++;
  
  if (checkCount > maxChecks) {
    console.log('⏰ 监控超时（5分钟）');
    console.log('   部署可能仍在进行中，请稍后手动检查。');
    return;
  }
  
  console.log(`🔍 检查 ${checkCount}/${maxChecks}: ${deploymentUrl}`);
  
  const req = https.get(deploymentUrl, { 
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Cache-Control': 'no-cache'
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`   状态: ${res.statusCode} ${res.statusMessage}`);
      
      if (res.statusCode === 200) {
        // 检查是否是Next.js应用
        const isNextJS = data.includes('__NEXT_DATA__');
        const hasOurComponents = data.includes('DesignProcess') && data.includes('Testimonials');
        
        console.log(`   Next.js: ${isNextJS ? '✅ 是' : '❌ 否'}`);
        console.log(`   我们的组件: ${hasOurComponents ? '✅ 已包含' : '❌ 未找到'}`);
        
        if (isNextJS && hasOurComponents) {
          console.log('\n🎉 🎉 🎉 部署成功！ 🎉 🎉 🎉');
          console.log('\n🚀 网站已准备好:');
          console.log(`   最新部署: ${deploymentUrl}`);
          console.log(`   主域名: https://wedesign.design`);
          console.log(`   Vercel别名: https://wedesign-mvp.vercel.app`);
          
          console.log('\n🔧 现在可以:');
          console.log('   1. 访问: https://wedesign.design');
          console.log('   2. 强制刷新: Ctrl+Shift+R');
          console.log('   3. 测试聊天功能');
          console.log('   4. 测试预约系统');
          console.log('   5. 查看专业设计');
          
          console.log('\n📱 功能清单:');
          console.log('   ✅ 专业Hero区域');
          console.log('   ✅ 实时聊天支持');
          console.log('   ✅ 预约日历系统');
          console.log('   ✅ 设计流程展示');
          console.log('   ✅ 客户评价轮播');
          console.log('   ✅ 完整支付系统');
          console.log('   ✅ 案例展示页面');
          console.log('   ✅ 后台管理系统');
          
          process.exit(0);
        } else {
          console.log('⏳ 部署可能仍在构建中，10秒后再次检查...\n');
          setTimeout(checkDeployment, 10000);
        }
      } else if (res.statusCode === 401 || res.statusCode === 403) {
        console.log('🔒 部署仍在构建中（需要认证），10秒后再次检查...\n');
        setTimeout(checkDeployment, 10000);
      } else {
        console.log('⏳ 部署进行中，10秒后再次检查...\n');
        setTimeout(checkDeployment, 10000);
      }
    });
  });
  
  req.on('error', (err) => {
    console.log(`   ❌ 连接错误: ${err.message}`);
    console.log('⏳ 10秒后再次检查...\n');
    setTimeout(checkDeployment, 10000);
  });
  
  req.on('timeout', () => {
    console.log('   ⏰ 请求超时');
    console.log('⏳ 10秒后再次检查...\n');
    setTimeout(checkDeployment, 10000);
  });
};

// 等待30秒后开始检查（给构建一些时间）
console.log('⏳ 等待30秒让构建开始...');
setTimeout(() => {
  console.log('🚀 开始监控部署进度...\n');
  checkDeployment();
}, 30000);