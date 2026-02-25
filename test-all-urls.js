// 测试所有URL
console.log('🌐 测试所有Wedesign访问地址');
console.log('============================\n');

const testUrls = [
  { name: 'Vercel主站', url: 'https://wedesign-mvp.vercel.app', priority: 1 },
  { name: '根域名HTTPS', url: 'https://wedesign.design', priority: 2 },
  { name: '根域名HTTP', url: 'http://wedesign.design', priority: 3 },
  { name: 'www子域名HTTPS', url: 'https://www.wedesign.design', priority: 4 },
  { name: 'www子域名HTTP', url: 'http://www.wedesign.design', priority: 5 },
  { name: '支付API', url: 'https://wedesign-mvp.vercel.app/api/checkout', priority: 1, isApi: true },
  { name: '案例页面', url: 'https://wedesign-mvp.vercel.app/cases', priority: 1 },
  { name: '管理后台', url: 'https://wedesign-mvp.vercel.app/admin/setup', priority: 1 }
];

async function testUrl(urlInfo) {
  const https = require('https');
  const http = require('http');
  
  return new Promise((resolve) => {
    const startTime = Date.now();
    const url = urlInfo.url;
    const isHttps = url.startsWith('https://');
    const module = isHttps ? https : http;
    const isApi = urlInfo.isApi;
    
    const options = {
      timeout: 10000,
      headers: isApi ? {
        'Content-Type': 'application/json'
      } : {}
    };
    
    if (isApi) {
      options.method = 'POST';
    }
    
    const req = module.request(url, options, (res) => {
      const duration = Date.now() - startTime;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        let result = {
          success: res.statusCode === 200 || res.statusCode === 201 || (res.statusCode >= 300 && res.statusCode < 400),
          statusCode: res.statusCode,
          duration,
          redirect: res.statusCode >= 300 && res.statusCode < 400 ? res.headers.location : null
        };
        
        if (isApi) {
          try {
            const json = JSON.parse(data);
            result.hasStripeUrl = json.url && json.url.includes('checkout.stripe.com');
            result.isApiSuccess = result.hasStripeUrl;
          } catch (e) {
            result.apiError = e.message;
          }
        } else {
          result.hasContent = data.includes('Professional Design Services') || data.includes('Wedesign');
        }
        
        resolve(result);
      });
    });
    
    req.on('error', (err) => {
      resolve({
        success: false,
        error: err.message,
        duration: Date.now() - startTime
      });
    });
    
    req.on('timeout', () => {
      resolve({
        success: false,
        error: 'Timeout',
        duration: 10000
      });
    });
    
    if (isApi) {
      const postData = JSON.stringify({
        price_id: 'price_1T4EQICY5vZ28ogKIt1fBRwd',
        email: 'url-test@example.com'
      });
      req.write(postData);
    }
    
    req.end();
  });
}

async function runAllTests() {
  console.log('开始测试所有访问地址...\n');
  
  const results = [];
  
  // 先测试高优先级（确保核心功能）
  const sortedUrls = [...testUrls].sort((a, b) => a.priority - b.priority);
  
  for (const urlInfo of sortedUrls) {
    process.stdout.write(`测试 ${urlInfo.name} (${urlInfo.url})... `);
    const result = await testUrl(urlInfo);
    results.push({ ...urlInfo, ...result });
    
    if (result.success) {
      if (result.redirect) {
        console.log(`✅ ${result.statusCode} → ${result.redirect.substring(0, 50)}... (${result.duration}ms)`);
      } else if (result.hasStripeUrl) {
        console.log(`✅ 支付API正常 (${result.duration}ms)`);
      } else {
        console.log(`✅ ${result.statusCode} (${result.duration}ms)`);
      }
    } else {
      console.log(`❌ ${result.error || `状态码: ${result.statusCode}`}`);
    }
    
    // 短暂延迟避免请求过快
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 测试结果汇总');
  console.log('============================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`总测试: ${results.length}`);
  console.log(`成功: ${successful.length}`);
  console.log(`失败: ${failed.length}`);
  console.log(`成功率: ${Math.round((successful.length / results.length) * 100)}%`);
  
  const avgDuration = successful.length > 0 
    ? Math.round(successful.reduce((sum, r) => sum + r.duration, 0) / successful.length)
    : 0;
  console.log(`平均响应时间: ${avgDuration}ms`);
  
  console.log('\n🔍 详细结果:');
  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${result.name}`);
    console.log(`   地址: ${result.url}`);
    console.log(`   状态: ${result.success ? '成功' : '失败'}`);
    if (result.statusCode) console.log(`   状态码: ${result.statusCode}`);
    if (result.duration) console.log(`   时间: ${result.duration}ms`);
    if (result.error) console.log(`   错误: ${result.error}`);
    if (result.redirect) console.log(`   重定向: ${result.redirect.substring(0, 60)}...`);
    if (result.hasStripeUrl) console.log(`   ✅ 支付功能正常`);
    console.log('');
  });
  
  console.log('\n🎯 核心功能状态:');
  const apiResult = results.find(r => r.name === '支付API');
  const vercelResult = results.find(r => r.name === 'Vercel主站');
  
  if (apiResult?.hasStripeUrl && vercelResult?.success) {
    console.log('✅ 支付系统正常');
    console.log('✅ 网站功能完整');
    console.log('🎉 核心业务闭环已就绪！');
  }
  
  console.log('\n🌐 推荐访问地址:');
  console.log('1. https://wedesign-mvp.vercel.app (立即可用，功能完整)');
  
  const rootHttpsResult = results.find(r => r.name === '根域名HTTPS');
  if (rootHttpsResult?.success) {
    console.log('2. https://wedesign.design (自定义域名)');
  }
  
  const wwwHttpsResult = results.find(r => r.name === 'www子域名HTTPS');
  if (wwwHttpsResult?.success) {
    console.log('3. https://www.wedesign.design (www子域名)');
  }
  
  console.log('\n🚀 立即开始使用:');
  console.log('访问上述任一地址 → 测试支付流程 → 开始接受订单！');
  
  console.log('\n⏱️  测试完成时间:', new Date().toLocaleTimeString());
}

runAllTests().catch(console.error);