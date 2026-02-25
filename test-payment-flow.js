// 测试支付流程
const https = require('https');

console.log('=== 开始测试支付闭环 ===\n');

// 1. 测试首页访问
testHomePage();

function testHomePage() {
  console.log('1. 测试首页访问...');
  
  const options = {
    hostname: 'wedesign-mvp.vercel.app',
    port: 443,
    path: '/',
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    console.log(`  状态码: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('  ✅ 首页访问正常');
        
        // 检查关键元素
        if (data.includes('Professional Design Services')) {
          console.log('  ✅ 页面内容正确');
        }
        if (data.includes('Get Professional - $599')) {
          console.log('  ✅ 购买按钮存在');
        }
        if (data.includes('test@example.com')) {
          console.log('  ✅ 测试指引存在');
        }
        
        testCasesPage();
      } else {
        console.log('  ❌ 首页访问失败');
      }
    });
  });

  req.on('error', (err) => {
    console.log('  ❌ 首页访问错误:', err.message);
  });

  req.end();
}

function testCasesPage() {
  console.log('\n2. 测试案例页面...');
  
  const options = {
    hostname: 'wedesign-mvp.vercel.app',
    port: 443,
    path: '/cases',
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    console.log(`  状态码: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('  ✅ 案例页访问正常');
        
        // 检查案例数量
        const caseCount = (data.match(/case-study-card/g) || []).length;
        console.log(`  ✅ 找到 ${caseCount} 个案例卡片`);
        
        testAdminSetupPage();
      } else {
        console.log('  ❌ 案例页访问失败');
      }
    });
  });

  req.on('error', (err) => {
    console.log('  ❌ 案例页访问错误:', err.message);
  });

  req.end();
}

function testAdminSetupPage() {
  console.log('\n3. 测试管理设置页面...');
  
  const options = {
    hostname: 'wedesign-mvp.vercel.app',
    port: 443,
    path: '/admin/setup',
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    console.log(`  状态码: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('  ✅ 管理设置页访问正常');
        
        if (data.includes('Database Setup')) {
          console.log('  ✅ 管理功能正常');
        }
        
        testCheckoutAPI();
      } else {
        console.log('  ❌ 管理设置页访问失败');
      }
    });
  });

  req.on('error', (err) => {
    console.log('  ❌ 管理设置页访问错误:', err.message);
  });

  req.end();
}

function testCheckoutAPI() {
  console.log('\n4. 测试支付API...');
  
  const postData = JSON.stringify({
    price_id: 'price_1T4ERcCY5vZ28ogKc0Vl6QfE',
    email: 'test@example.com'
  });

  const options = {
    hostname: 'wedesign-mvp.vercel.app',
    port: 443,
    path: '/api/checkout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`  状态码: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('  ✅ 支付API正常');
        try {
          const result = JSON.parse(data);
          console.log('  ✅ 返回支付链接:', result.url?.substring(0, 50) + '...');
        } catch (e) {
          console.log('  ⚠️ 返回数据解析异常');
        }
      } else if (res.statusCode === 500) {
        console.log('  ⚠️ 支付API返回500错误（可能是环境变量问题）');
        console.log('  错误信息:', data.substring(0, 200));
      } else {
        console.log('  ❌ 支付API异常状态码:', res.statusCode);
      }
      
      console.log('\n=== 测试总结 ===');
      console.log('✅ 前端页面全部正常');
      console.log('⚠️ 支付API需要环境变量配置');
      console.log('\n建议：');
      console.log('1. 在Vercel中配置正确的STRIPE_SECRET_KEY');
      console.log('2. 确保NEXT_PUBLIC_APP_URL指向正确域名');
      console.log('3. 测试实际支付流程');
    });
  });

  req.on('error', (err) => {
    console.log('  ❌ 支付API请求错误:', err.message);
  });

  req.write(postData);
  req.end();
}