// 快速检查部署状态
const https = require('https');

console.log('🚀 检查部署状态...');
console.log('============================\n');

const urls = [
  'https://wedesign.design',
  'https://wedesign-mvp.vercel.app'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const req = https.get(url, { 
      timeout: 5000,
      headers: {
        'User-Agent': 'Deployment-Check/1.0'
      }
    }, (res) => {
      const responseTime = Date.now() - startTime;
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // 检查是否是新设计
        const isNewDesign = data.includes('primary-gradient-text') || 
                           data.includes('font-heading') ||
                           data.includes('Poppins');
        
        resolve({
          url,
          status: res.statusCode,
          responseTime: `${responseTime}ms`,
          isNewDesign,
          success: res.statusCode === 200
        });
      });
    });
    
    req.on('error', () => {
      resolve({
        url,
        status: 0,
        responseTime: 'error',
        isNewDesign: false,
        success: false
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        url,
        status: 0,
        responseTime: 'timeout',
        isNewDesign: false,
        success: false
      });
    });
    
    req.end();
  });
}

async function checkAll() {
  console.log('🔍 检查部署状态...\n');
  
  for (const url of urls) {
    const result = await checkUrl(url);
    console.log(`${result.success ? '✅' : '❌'} ${url}`);
    console.log(`   状态: ${result.status} | 时间: ${result.responseTime}`);
    console.log(`   新设计: ${result.isNewDesign ? '✅ 已部署' : '⏳ 构建中'}`);
    console.log('');
    
    // 短暂等待
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('💡 建议:');
  console.log('   如果新设计还未部署，Vercel可能仍在构建中');
  console.log('   通常需要2-5分钟完成构建和部署');
  console.log('   可以继续开发，部署会自动完成');
}

checkAll().catch(console.error);