// 立即DNS测试脚本
const dns = require('dns');
const { promisify } = require('util');
const resolve4 = promisify(dns.resolve4);

console.log('🚀 立即DNS配置测试');
console.log('============================\n');

async function testDNS() {
  console.log('测试 wedesign.design DNS...');
  
  try {
    const addresses = await resolve4('wedesign.design');
    console.log(`当前解析IP: ${addresses.join(', ')}`);
    
    const hasVercelIP = addresses.includes('76.76.21.21');
    const hasOldIP = addresses.includes('204.69.207.1');
    
    if (hasVercelIP && !hasOldIP) {
      console.log('✅ DNS配置完美！');
      console.log('网站已准备好上线！');
      return true;
    } else if (hasVercelIP && hasOldIP) {
      console.log('⚠️  需要删除旧记录 204.69.207.1');
      console.log('请在GoDaddy删除该记录');
      return false;
    } else if (!hasVercelIP && hasOldIP) {
      console.log('❌ 需要添加Vercel记录 76.76.21.21');
      console.log('请在GoDaddy添加A记录');
      return false;
    } else {
      console.log('❌ 未知配置');
      return false;
    }
  } catch (error) {
    console.log(`❌ DNS解析失败: ${error.message}`);
    console.log('可能DNS还未配置');
    return false;
  }
}

async function testWebsite() {
  console.log('\n测试网站访问...');
  
  const https = require('https');
  const url = 'https://wedesign-mvp.vercel.app';
  
  return new Promise((resolve) => {
    const startTime = Date.now();
    const req = https.get(url, { timeout: 10000 }, (res) => {
      const duration = Date.now() - startTime;
      console.log(`✅ 网站可访问: ${res.statusCode} (${duration}ms)`);
      console.log(`标题: ${res.headers['content-type']?.includes('html') ? 'HTML页面' : '其他'}`);
      resolve(true);
    });
    
    req.on('error', (err) => {
      console.log(`❌ 网站访问失败: ${err.message}`);
      resolve(false);
    });
    
    req.on('timeout', () => {
      console.log('⏱️  网站访问超时');
      resolve(false);
    });
  });
}

async function testPayment() {
  console.log('\n测试支付功能...');
  
  const https = require('https');
  const postData = JSON.stringify({
    price_id: 'price_1T4EQICY5vZ28ogKIt1fBRwd',
    email: 'test-dns@example.com'
  });
  
  const options = {
    hostname: 'wedesign-mvp.vercel.app',
    port: 443,
    path: '/api/checkout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    },
    timeout: 10000
  };
  
  return new Promise((resolve) => {
    const startTime = Date.now();
    const req = https.request(options, (res) => {
      const duration = Date.now() - startTime;
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.url && json.url.includes('checkout.stripe.com')) {
            console.log(`✅ 支付API正常: ${duration}ms`);
            console.log(`支付链接: ${json.url.substring(0, 60)}...`);
            resolve(true);
          } else {
            console.log(`❌ 支付API异常: ${data.substring(0, 100)}`);
            resolve(false);
          }
        } catch (e) {
          console.log(`❌ 支付API解析失败: ${e.message}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ 支付API请求失败: ${err.message}`);
      resolve(false);
    });
    
    req.on('timeout', () => {
      console.log('⏱️  支付API超时');
      resolve(false);
    });
    
    req.write(postData);
    req.end();
  });
}

async function runAllTests() {
  console.log('开始全面测试...\n');
  
  const dnsOk = await testDNS();
  const websiteOk = await testWebsite();
  const paymentOk = await testPayment();
  
  console.log('\n📊 测试结果汇总');
  console.log('============================');
  console.log(`DNS配置: ${dnsOk ? '✅' : '❌'}`);
  console.log(`网站访问: ${websiteOk ? '✅' : '❌'}`);
  console.log(`支付功能: ${paymentOk ? '✅' : '❌'}`);
  
  const totalTests = 3;
  const passedTests = [dnsOk, websiteOk, paymentOk].filter(Boolean).length;
  const percentage = Math.round((passedTests / totalTests) * 100);
  
  console.log(`\n通过率: ${percentage}% (${passedTests}/${totalTests})`);
  
  if (dnsOk && websiteOk && paymentOk) {
    console.log('\n🎉 所有测试通过！');
    console.log('🚀 网站已完全准备好上线！');
    console.log('\n访问地址:');
    console.log('- https://wedesign.design');
    console.log('- https://wedesign-mvp.vercel.app');
  } else if (websiteOk && paymentOk) {
    console.log('\n⚠️  核心功能正常，DNS需要配置');
    console.log('请立即配置GoDaddy DNS！');
  } else if (paymentOk) {
    console.log('\n✅ 支付系统正常，可以接受订单');
    console.log('🔧 需要修复DNS和网站访问');
  } else {
    console.log('\n❌ 需要紧急修复');
    console.log('1. 配置DNS');
    console.log('2. 检查网站部署');
    console.log('3. 验证支付API');
  }
  
  console.log('\n⏱️  测试完成时间:', new Date().toLocaleTimeString());
}

runAllTests().catch(console.error);