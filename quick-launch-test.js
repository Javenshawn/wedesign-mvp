// 快速上线测试
console.log('🚀 Wedesign 快速上线测试');
console.log('============================\n');

const testStages = [
  { name: 'DNS配置', url: 'wedesign.design', type: 'dns' },
  { name: 'Vercel部署', url: 'https://wedesign-mvp.vercel.app', type: 'web' },
  { name: '支付API', url: 'https://wedesign-mvp.vercel.app/api/checkout', type: 'api' },
  { name: '案例页面', url: 'https://wedesign-mvp.vercel.app/cases', type: 'web' },
  { name: '管理后台', url: 'https://wedesign-mvp.vercel.app/admin/setup', type: 'web' }
];

async function testDNS(domain) {
  const dns = require('dns').promises;
  try {
    const addresses = await dns.resolve4(domain);
    const hasVercelIP = addresses.some(ip => ip === '76.76.21.21');
    return {
      success: hasVercelIP,
      message: hasVercelIP ? `✅ 解析到Vercel: ${addresses.join(', ')}` : `❌ 未解析到Vercel: ${addresses.join(', ')}`
    };
  } catch (error) {
    return { success: false, message: `❌ DNS解析失败: ${error.message}` };
  }
}

async function testWeb(url) {
  const https = require('https');
  return new Promise((resolve) => {
    const startTime = Date.now();
    const req = https.get(url, { timeout: 10000 }, (res) => {
      const duration = Date.now() - startTime;
      resolve({
        success: res.statusCode === 200,
        message: `✅ ${res.statusCode} (${duration}ms)`,
        duration
      });
    });
    
    req.on('error', (err) => {
      resolve({ success: false, message: `❌ ${err.message}` });
    });
    
    req.on('timeout', () => {
      resolve({ success: false, message: '⏱️  超时' });
    });
  });
}

async function testAPI(url) {
  const https = require('https');
  return new Promise((resolve) => {
    const startTime = Date.now();
    const postData = JSON.stringify({
      price_id: 'price_1T4EQICY5vZ28ogKIt1fBRwd',
      email: 'launch-test@example.com'
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    };
    
    const req = https.request(url, options, (res) => {
      const duration = Date.now() - startTime;
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const hasStripeUrl = json.url && json.url.includes('checkout.stripe.com');
          resolve({
            success: res.statusCode === 200 && hasStripeUrl,
            message: hasStripeUrl ? `✅ 支付API正常 (${duration}ms)` : `❌ 支付API异常: ${data.substring(0, 100)}`,
            duration
          });
        } catch (e) {
          resolve({ success: false, message: `❌ API响应解析失败: ${e.message}` });
        }
      });
    });
    
    req.on('error', (err) => {
      resolve({ success: false, message: `❌ ${err.message}` });
    });
    
    req.on('timeout', () => {
      resolve({ success: false, message: '⏱️  超时' });
    });
    
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('开始快速上线测试...\n');
  
  const results = [];
  let totalDuration = 0;
  let successCount = 0;
  
  for (const stage of testStages) {
    process.stdout.write(`测试 ${stage.name}... `);
    
    let result;
    if (stage.type === 'dns') {
      result = await testDNS(stage.url);
    } else if (stage.type === 'api') {
      result = await testAPI(stage.url);
    } else {
      result = await testWeb(stage.url);
    }
    
    console.log(result.message);
    results.push({ ...stage, ...result });
    
    if (result.success) successCount++;
    if (result.duration) totalDuration += result.duration;
  }
  
  // 计算统计数据
  const avgDuration = successCount > 0 ? Math.round(totalDuration / successCount) : 0;
  
  console.log('\n📊 上线测试结果汇总');
  console.log('============================');
  console.log(`测试阶段: ${results.length}`);
  console.log(`通过阶段: ${successCount}`);
  console.log(`通过率: ${Math.round((successCount / results.length) * 100)}%`);
  console.log(`平均响应时间: ${avgDuration}ms`);
  
  console.log('\n🔍 详细状态:');
  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${result.name}`);
    console.log(`   地址: ${result.url}`);
    console.log(`   结果: ${result.message}`);
  });
  
  console.log('\n🚀 上线速率评估:');
  if (successCount === results.length) {
    console.log('🎉 所有测试通过！网站已准备好上线！');
    console.log('⚡ 平均响应时间:', avgDuration < 1000 ? '极快 (<1秒)' : avgDuration < 2000 ? '快速 (<2秒)' : '可接受');
  } else if (successCount >= 3) {
    console.log('⚠️  核心功能正常，部分功能需要调整');
    console.log('建议优先修复失败的功能');
  } else {
    console.log('❌ 核心功能异常，需要紧急修复');
  }
  
  // 检查关键功能
  const dnsResult = results.find(r => r.name === 'DNS配置');
  const apiResult = results.find(r => r.name === '支付API');
  
  console.log('\n🎯 关键功能验证:');
  if (dnsResult?.success) {
    console.log('✅ DNS配置正确 → 域名可访问');
  } else {
    console.log('❌ DNS配置问题 → 需要修复GoDaddy配置');
  }
  
  if (apiResult?.success) {
    console.log('✅ 支付API正常 → 可接受订单');
  } else {
    console.log('❌ 支付API异常 → 无法收款');
  }
  
  console.log('\n📈 上线准备度:');
  const readiness = Math.round((successCount / results.length) * 100);
  if (readiness >= 90) {
    console.log('🟢 准备度: 优秀 (90%+) - 可立即上线');
  } else if (readiness >= 70) {
    console.log('🟡 准备度: 良好 (70%+) - 建议修复后上线');
  } else {
    console.log('🔴 准备度: 不足 (<70%) - 需要修复');
  }
  
  console.log('\n🚀 立即行动建议:');
  if (dnsResult?.success && apiResult?.success) {
    console.log('1. ✅ DNS已配置');
    console.log('2. ✅ 支付系统正常');
    console.log('3. 🎉 网站可以开始接受订单！');
  } else {
    console.log('1. 🔧 修复DNS配置 (GoDaddy)');
    console.log('2. 🔧 修复支付API (Vercel环境变量)');
    console.log('3. 🔧 重新部署代码');
  }
  
  console.log('\n============================');
  console.log('测试完成时间:', new Date().toLocaleTimeString());
}

runTests().catch(console.error);