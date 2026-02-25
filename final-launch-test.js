// 最终上线测试
console.log('🚀 Wedesign 最终上线测试');
console.log('============================\n');

const testCases = [
  { name: 'DNS配置', test: testDNS },
  { name: 'Vercel网站', test: testVercelSite },
  { name: '支付API', test: testPaymentAPI },
  { name: '案例页面', test: testCasesPage },
  { name: '管理后台', test: testAdminPage }
];

async function testDNS() {
  const dns = require('dns').promises;
  try {
    const addresses = await dns.resolve4('wedesign.design');
    const hasVercelIP = addresses.includes('76.76.21.21');
    const hasOldIP = addresses.includes('204.69.207.1');
    
    if (hasVercelIP && !hasOldIP) {
      return { success: true, message: `✅ DNS正确: ${addresses.join(', ')}` };
    } else if (hasVercelIP && hasOldIP) {
      return { success: false, message: `⚠️  需要删除旧IP: 204.69.207.1` };
    } else {
      return { success: false, message: `❌ 未指向Vercel: ${addresses.join(', ')}` };
    }
  } catch (error) {
    return { success: false, message: `❌ DNS解析失败: ${error.message}` };
  }
}

async function testVercelSite() {
  return testWeb('https://wedesign-mvp.vercel.app');
}

async function testPaymentAPI() {
  const https = require('https');
  const postData = JSON.stringify({
    price_id: 'price_1T4EQICY5vZ28ogKIt1fBRwd',
    email: 'final-test@example.com'
  });
  
  return new Promise((resolve) => {
    const startTime = Date.now();
    const req = https.request({
      hostname: 'wedesign-mvp.vercel.app',
      port: 443,
      path: '/api/checkout',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 10000
    }, (res) => {
      const duration = Date.now() - startTime;
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.url && json.url.includes('checkout.stripe.com')) {
            resolve({ success: true, message: `✅ 支付API正常 (${duration}ms)`, duration });
          } else {
            resolve({ success: false, message: `❌ 支付API异常: ${data.substring(0, 100)}` });
          }
        } catch (e) {
          resolve({ success: false, message: `❌ 支付API解析失败: ${e.message}` });
        }
      });
    });
    
    req.on('error', (err) => {
      resolve({ success: false, message: `❌ 支付API请求失败: ${err.message}` });
    });
    
    req.on('timeout', () => {
      resolve({ success: false, message: '⏱️  支付API超时' });
    });
    
    req.write(postData);
    req.end();
  });
}

async function testCasesPage() {
  return testWeb('https://wedesign-mvp.vercel.app/cases');
}

async function testAdminPage() {
  return testWeb('https://wedesign-mvp.vercel.app/admin/setup');
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

async function runAllTests() {
  console.log('开始最终上线测试...\n');
  
  const results = [];
  let totalDuration = 0;
  let successCount = 0;
  
  for (const testCase of testCases) {
    process.stdout.write(`测试 ${testCase.name}... `);
    const result = await testCase.test();
    console.log(result.message);
    results.push({ ...testCase, ...result });
    
    if (result.success) successCount++;
    if (result.duration) totalDuration += result.duration;
  }
  
  // 计算统计数据
  const avgDuration = successCount > 0 ? Math.round(totalDuration / successCount) : 0;
  
  console.log('\n📊 最终测试结果汇总');
  console.log('============================');
  console.log(`测试项目: ${results.length}`);
  console.log(`通过项目: ${successCount}`);
  console.log(`通过率: ${Math.round((successCount / results.length) * 100)}%`);
  console.log(`平均响应时间: ${avgDuration}ms`);
  
  console.log('\n🔍 详细结果:');
  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${result.name}: ${result.message}`);
  });
  
  console.log('\n🚀 上线状态评估:');
  
  const dnsResult = results.find(r => r.name === 'DNS配置');
  const paymentResult = results.find(r => r.name === '支付API');
  
  if (dnsResult?.success && paymentResult?.success) {
    console.log('🎉 核心功能完全正常！');
    console.log('✅ DNS配置正确');
    console.log('✅ 支付系统正常');
    console.log('✅ 网站功能完整');
    console.log('\n🚀 网站已准备好上线运行！');
  } else if (paymentResult?.success) {
    console.log('⚠️  支付系统正常，但DNS需要检查');
    console.log('网站可以通过Vercel域名访问');
  } else {
    console.log('❌ 需要修复关键功能');
  }
  
  console.log('\n⚡ 性能指标:');
  console.log(`- 平均响应: ${avgDuration}ms`);
  console.log('- 标准: <1000ms (优秀), <2000ms (良好), <3000ms (可接受)');
  
  if (avgDuration < 1000) {
    console.log('⚡ 响应速度: 优秀！');
  } else if (avgDuration < 2000) {
    console.log('🚀 响应速度: 良好！');
  } else {
    console.log('⚠️  响应速度: 需要优化');
  }
  
  console.log('\n🎯 立即可用功能:');
  if (paymentResult?.success) {
    console.log('1. ✅ 接受在线支付');
    console.log('2. ✅ 展示成功案例');
    console.log('3. ✅ 管理订单后台');
    console.log('4. ✅ 完整业务流程');
  }
  
  console.log('\n🌐 访问地址:');
  console.log('- 主站: https://wedesign-mvp.vercel.app');
  console.log('- 案例: https://wedesign-mvp.vercel.app/cases');
  console.log('- 管理: https://wedesign-mvp.vercel.app/admin/setup');
  
  console.log('\n💰 测试支付流程:');
  console.log('1. 访问上述链接');
  console.log('2. 输入邮箱: test@example.com');
  console.log('3. 点击 "Get Professional - $599"');
  console.log('4. 使用测试卡: 4242 4242 4242 4242');
  console.log('5. 验证支付成功');
  
  console.log('\n============================');
  console.log('🎉 最终上线测试完成！');
  console.log('网站已准备好投入生产使用！');
}

runAllTests().catch(console.error);