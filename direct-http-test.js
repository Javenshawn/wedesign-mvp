// 直接HTTP测试，绕过DNS问题
const https = require('https');

console.log('🌐 直接HTTP测试...');
console.log('============================\n');

const domains = [
  'wedesign.design',
  'www.wedesign.design',
  'wedesign-mvp.vercel.app'
];

async function testDomain(domain) {
  return new Promise((resolve) => {
    console.log(`🔍 测试: https://${domain}`);
    
    const startTime = Date.now();
    const req = https.get(`https://${domain}`, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, (res) => {
      const responseTime = Date.now() - startTime;
      
      console.log(`   📡 状态: ${res.statusCode} ${res.statusMessage}`);
      console.log(`       时间: ${responseTime}ms`);
      console.log(`       服务器: ${res.headers.server || '未知'}`);
      console.log(`       内容类型: ${res.headers['content-type'] || '未知'}`);
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>(.*?)<\/title>/i);
        const hasWedesign = data.includes('Wedesign') || data.includes('wedesign');
        const hasStripe = data.includes('stripe') || data.includes('Stripe');
        
        console.log(`       标题: ${titleMatch ? titleMatch[1].substring(0, 50) : '无标题'}`);
        console.log(`       包含Wedesign: ${hasWedesign ? '✅' : '❌'}`);
        console.log(`       包含Stripe: ${hasStripe ? '✅' : '❌'}`);
        
        resolve({
          domain,
          status: res.statusCode,
          statusText: res.statusMessage,
          responseTime,
          server: res.headers.server,
          title: titleMatch ? titleMatch[1] : null,
          hasWedesign,
          hasStripe,
          success: res.statusCode === 200
        });
      });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ 错误: ${error.message}`);
      resolve({
        domain,
        status: 0,
        statusText: `错误: ${error.message}`,
        responseTime: 0,
        success: false
      });
    });
    
    req.on('timeout', () => {
      console.log('   ⏰ 超时');
      req.destroy();
      resolve({
        domain,
        status: 0,
        statusText: '超时',
        responseTime: 0,
        success: false
      });
    });
    
    req.end();
  });
}

async function runTests() {
  const results = [];
  
  for (const domain of domains) {
    const result = await testDomain(domain);
    results.push(result);
    console.log('');
    
    // 等待1秒避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('📊 测试结果汇总:');
  console.log('='.repeat(60));
  
  results.forEach(result => {
    console.log(`${result.success ? '✅' : '❌'} ${result.domain}: ${result.status} ${result.statusText}`);
  });
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log(`\n🎯 成功率: ${successful}/${total} (${Math.round((successful/total)*100)}%)`);
  
  // 分析www域名问题
  const wwwResult = results.find(r => r.domain === 'www.wedesign.design');
  const mainResult = results.find(r => r.domain === 'wedesign.design');
  
  if (wwwResult && mainResult) {
    console.log('\n🔍 www域名问题分析:');
    console.log(`   主域名状态: ${mainResult.status} ${mainResult.statusText}`);
    console.log(`   www域名状态: ${wwwResult.status} ${wwwResult.statusText}`);
    
    if (wwwResult.status === 401 && mainResult.status === 200) {
      console.log('\n🚨 问题确认: www域名返回401，主域名正常');
      console.log('💡 解决方案:');
      console.log('   1. 检查Vercel项目域名配置');
      console.log('   2. 确保www.wedesign.design已添加到域名列表');
      console.log('   3. 检查重定向配置');
      console.log('   4. 联系Vercel支持');
    }
  }
  
  // 保存测试报告
  const report = {
    timestamp: new Date().toISOString(),
    results: results.map(r => ({
      domain: r.domain,
      status: r.status,
      statusText: r.statusText,
      responseTime: r.responseTime,
      server: r.server,
      title: r.title,
      success: r.success
    })),
    summary: {
      total,
      successful,
      failed: total - successful,
      successRate: Math.round((successful/total)*100)
    },
    recommendations: []
  };
  
  // 添加建议
  if (wwwResult && wwwResult.status === 401) {
    report.recommendations.push({
      priority: '高',
      issue: 'www.wedesign.design返回401错误',
      action: '联系Vercel支持解决域名配置问题',
      impact: '用户无法通过www域名访问'
    });
  }
  
  require('fs').writeFileSync('domain-test-report.json', JSON.stringify(report, null, 2));
  console.log('\n📁 测试报告已保存: domain-test-report.json');
}

runTests().catch(console.error);