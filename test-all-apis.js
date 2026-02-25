// 测试所有API端点
const https = require('https');

console.log('🔧 测试所有API端点...');
console.log('============================\n');

const endpoints = [
  {
    name: '支付API (POST)',
    path: '/api/checkout',
    method: 'POST',
    data: {
      price_id: 'price_1T4ERcCY5vZ28ogKeAmpEtdq',
      email: 'test@example.com'
    }
  },
  {
    name: '订单API (POST)',
    path: '/api/orders',
    method: 'POST',
    data: {
      email: 'test@example.com',
      plan: 'Basic',
      projectName: 'Test Project',
      contactName: 'Test User',
      requirements: 'Testing API'
    }
  },
  {
    name: '健康检查API (GET)',
    path: '/api/health',
    method: 'GET'
  },
  {
    name: '首页 (GET)',
    path: '/',
    method: 'GET'
  },
  {
    name: '案例页面 (GET)',
    path: '/cases',
    method: 'GET'
  },
  {
    name: '管理后台 (GET)',
    path: '/admin',
    method: 'GET'
  }
];

async function testEndpoint(endpoint) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'wedesign.design',
      port: 443,
      path: endpoint.path,
      method: endpoint.method,
      headers: {
        'User-Agent': 'API-Test/1.0'
      },
      timeout: 10000
    };

    if (endpoint.method === 'POST') {
      options.headers['Content-Type'] = 'application/json';
    }

    const startTime = Date.now();
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const responseTime = Date.now() - startTime;
        
        let parsedData;
        try {
          parsedData = JSON.parse(data);
        } catch {
          parsedData = data.substring(0, 200) + (data.length > 200 ? '...' : '');
        }

        resolve({
          name: endpoint.name,
          status: res.statusCode,
          statusText: res.statusMessage,
          responseTime: `${responseTime}ms`,
          success: res.statusCode < 400,
          data: parsedData
        });
      });
    });

    req.on('error', (error) => {
      resolve({
        name: endpoint.name,
        status: 0,
        statusText: `错误: ${error.message}`,
        responseTime: 'N/A',
        success: false,
        data: null
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: endpoint.name,
        status: 0,
        statusText: '超时',
        responseTime: 'N/A',
        success: false,
        data: null
      });
    });

    if (endpoint.method === 'POST' && endpoint.data) {
      req.write(JSON.stringify(endpoint.data));
    }

    req.end();
  });
}

async function runAllTests() {
  const results = [];
  
  for (const endpoint of endpoints) {
    console.log(`📤 测试: ${endpoint.name}...`);
    const result = await testEndpoint(endpoint);
    results.push(result);
    
    console.log(`   ${result.success ? '✅' : '❌'} ${result.status} ${result.statusText} (${result.responseTime})`);
    
    // 等待1秒避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 测试结果汇总:');
  console.log('='.repeat(60));
  
  results.forEach(result => {
    console.log(`${result.success ? '✅' : '❌'} ${result.name}: ${result.status} ${result.statusText}`);
  });
  
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log(`\n🎯 成功率: ${successful}/${total} (${Math.round((successful/total)*100)}%)`);
  
  // 显示失败详情
  const failures = results.filter(r => !r.success);
  if (failures.length > 0) {
    console.log('\n🚨 失败端点详情:');
    failures.forEach(failure => {
      console.log(`   ${failure.name}: ${failure.statusText}`);
    });
  }
  
  // 显示关键API状态
  console.log('\n🔑 关键API状态:');
  const keyAPIs = results.filter(r => 
    r.name.includes('支付API') || 
    r.name.includes('订单API') || 
    r.name.includes('健康检查')
  );
  
  keyAPIs.forEach(api => {
    console.log(`   ${api.success ? '✅' : '❌'} ${api.name}: ${api.status} ${api.statusText}`);
  });
  
  // 保存测试报告
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: 'https://wedesign.design',
    results: results.map(r => ({
      name: r.name,
      status: r.status,
      statusText: r.statusText,
      responseTime: r.responseTime,
      success: r.success
    })),
    summary: {
      total,
      successful,
      failed: total - successful,
      successRate: Math.round((successful/total)*100)
    }
  };
  
  require('fs').writeFileSync('api-test-report.json', JSON.stringify(report, null, 2));
  console.log('\n📁 测试报告已保存: api-test-report.json');
}

runAllTests().catch(console.error);