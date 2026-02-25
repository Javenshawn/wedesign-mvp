// 测试支付API
const https = require('https');

console.log('💰 测试支付API...');
console.log('============================\n');

const testData = {
  price_id: 'price_1T4ERcCY5vZ28ogKeAmpEtdq', // Basic $299
  email: 'test@example.com',
  metadata: {
    projectName: 'Test Project',
    contactName: 'Test User',
    requirements: 'Testing payment API'
  }
};

const options = {
  hostname: 'wedesign.design',
  port: 443,
  path: '/api/checkout',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Payment-API-Test/1.0'
  },
  timeout: 10000
};

console.log('📤 发送测试请求:');
console.log(`   端点: https://wedesign.design/api/checkout`);
console.log(`   价格ID: ${testData.price_id}`);
console.log(`   邮箱: ${testData.email}`);
console.log(`   项目: ${testData.metadata.projectName}`);
console.log('');

const req = https.request(options, (res) => {
  console.log(`📥 响应状态: ${res.statusCode} ${res.statusMessage}`);
  console.log(`   响应头:`);
  Object.entries(res.headers).forEach(([key, value]) => {
    console.log(`     ${key}: ${value}`);
  });

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n📄 响应内容:');
    try {
      const jsonData = JSON.parse(data);
      console.log(JSON.stringify(jsonData, null, 2));
      
      if (res.statusCode === 200 && jsonData.url) {
        console.log('\n✅ 支付API测试成功!');
        console.log(`   支付链接: ${jsonData.url}`);
      } else {
        console.log('\n❌ 支付API返回错误:');
        console.log(`   错误: ${jsonData.error || '未知错误'}`);
      }
    } catch (e) {
      console.log('   无法解析JSON响应:');
      console.log(data.substring(0, 500));
    }
    
    console.log('\n🔍 诊断建议:');
    if (res.statusCode === 400) {
      console.log('   1. 检查Stripe产品ID是否正确');
      console.log('   2. 检查Stripe API密钥是否有效');
      console.log('   3. 检查Stripe账户是否激活');
      console.log('   4. 查看Stripe仪表盘日志');
    } else if (res.statusCode === 500) {
      console.log('   1. 检查服务器端错误日志');
      console.log('   2. 检查环境变量配置');
      console.log('   3. 检查Stripe API版本兼容性');
    }
  });
});

req.on('error', (error) => {
  console.log(`❌ 请求失败: ${error.message}`);
  console.log('\n🔍 诊断建议:');
  console.log('   1. 检查域名解析');
  console.log('   2. 检查SSL证书');
  console.log('   3. 检查网络连接');
});

req.on('timeout', () => {
  console.log('⏰ 请求超时');
  req.destroy();
});

req.write(JSON.stringify(testData));
req.end();