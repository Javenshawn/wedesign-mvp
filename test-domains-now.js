// 立即测试域名访问
const https = require('https');

console.log('🌐 立即测试域名访问状态');
console.log('============================\n');

const domains = [
  'wedesign.design',
  'www.wedesign.design',
  'wedesign-mvp.vercel.app'  // 作为对比
];

async function testDomain(domain) {
  return new Promise((resolve) => {
    const url = `https://${domain}`;
    const startTime = Date.now();
    
    console.log(`🔍 测试 ${domain}...`);
    
    const req = https.get(url, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      let content = '';
      res.on('data', (chunk) => {
        content += chunk.toString();
      });
      
      res.on('end', () => {
        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : '未找到标题';
        
        resolve({
          domain,
          status: res.statusCode,
          statusText: res.statusMessage,
          responseTime: `${responseTime}ms`,
          title: title.substring(0, 50),
          success: res.statusCode === 200,
          headers: {
            'content-type': res.headers['content-type'],
            'server': res.headers['server']
          }
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        domain,
        status: 0,
        statusText: `连接失败: ${error.message}`,
        responseTime: 'N/A',
        title: 'N/A',
        success: false,
        error: error.message
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        domain,
        status: 0,
        statusText: '连接超时',
        responseTime: 'N/A',
        title: 'N/A',
        success: false,
        error: 'timeout'
      });
    });
    
    req.end();
  });
}

async function runTests() {
  console.log('🚀 开始测试域名访问...\n');
  
  const results = [];
  
  for (const domain of domains) {
    const result = await testDomain(domain);
    results.push(result);
    
    // 立即显示结果
    console.log(`  ${result.success ? '✅' : '❌'} ${domain}`);
    console.log(`     状态: ${result.status} ${result.statusText}`);
    console.log(`     响应时间: ${result.responseTime}`);
    console.log(`     标题: ${result.title}`);
    console.log(`     服务器: ${result.headers?.server || 'N/A'}`);
    console.log('');
    
    // 等待1秒，避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 生成总结报告
  console.log('📊 测试总结报告');
  console.log('='.repeat(50));
  
  const successfulDomains = results.filter(r => r.success);
  const failedDomains = results.filter(r => !r.success);
  
  console.log(`✅ 成功访问: ${successfulDomains.length}/${domains.length}`);
  successfulDomains.forEach(r => {
    console.log(`   - ${r.domain} (${r.status}, ${r.responseTime})`);
  });
  
  if (failedDomains.length > 0) {
    console.log(`\n❌ 访问失败: ${failedDomains.length}/${domains.length}`);
    failedDomains.forEach(r => {
      console.log(`   - ${r.domain}: ${r.statusText}`);
    });
  }
  
  // 检查DNS解析
  console.log('\n🔍 DNS解析检查:');
  const { execSync } = require('child_process');
  
  for (const domain of domains.slice(0, 2)) { // 只检查自定义域名
    try {
      const output = execSync(`nslookup ${domain}`, { encoding: 'utf8' });
      const ipMatch = output.match(/Address:\s+(\d+\.\d+\.\d+\.\d+)/);
      if (ipMatch) {
        console.log(`   ${domain} → ${ipMatch[1]} (Vercel IP)`);
      }
    } catch (error) {
      console.log(`   ${domain}: DNS查询失败`);
    }
  }
  
  // 最终建议
  console.log('\n💡 建议:');
  if (successfulDomains.length === domains.length) {
    console.log('🎉 所有域名都正常访问！网站已完全上线。');
    console.log('   主域名: https://wedesign.design');
    console.log('   WWW域名: https://www.wedesign.design');
  } else if (successfulDomains.length >= 2) {
    console.log('⚠️  部分域名访问正常，建议检查DNS传播。');
    console.log('   通常DNS更改需要5-60分钟完全生效。');
  } else {
    console.log('🚨 多个域名访问失败，需要进一步排查。');
    console.log('   1. 检查Vercel项目配置');
    console.log('   2. 检查DNS解析是否正确');
    console.log('   3. 检查SSL证书状态');
  }
  
  console.log('\n⏱️  测试完成时间:', new Date().toLocaleTimeString());
}

runTests().catch(error => {
  console.error('测试失败:', error);
});