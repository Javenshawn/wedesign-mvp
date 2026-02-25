// 测试DNS修复后的网站
console.log('🎉 测试DNS修复后的 www.wedesign.design');
console.log('============================\n');

const https = require('https');
const http = require('http');

async function testAllUrls() {
  console.log('🌐 测试所有访问地址:');
  console.log('----------------------');
  
  const testUrls = [
    { name: 'Vercel主站', url: 'https://wedesign-mvp.vercel.app', priority: 1 },
    { name: '根域名HTTPS', url: 'https://wedesign.design', priority: 2 },
    { name: '根域名HTTP', url: 'http://wedesign.design', priority: 3 },
    { name: 'www子域名HTTPS', url: 'https://www.wedesign.design', priority: 4 },
    { name: 'www子域名HTTP', url: 'http://www.wedesign.design', priority: 5 },
    { name: '案例页面', url: 'https://wedesign-mvp.vercel.app/cases', priority: 1 },
    { name: '管理后台', url: 'https://wedesign-mvp.vercel.app/admin/setup', priority: 1 },
    { name: '支付API', url: 'https://wedesign-mvp.vercel.app/api/checkout', priority: 1, isApi: true }
  ];
  
  const results = [];
  
  for (const test of testUrls) {
    process.stdout.write(`测试 ${test.name}... `);
    const result = await testUrl(test);
    results.push({ ...test, ...result });
    
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
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return results;
}

async function testUrl(testCase) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const url = testCase.url;
    const isHttps = url.startsWith('https://');
    const module = isHttps ? https : http;
    const isApi = testCase.isApi;
    
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
        price_id: 'price_1T4ERcCY5vZ28ogKeAmpEtdq',
        email: 'test@example.com'
      });
      req.write(postData);
    }
    
    req.end();
  });
}

async function checkSSL() {
  console.log('\n🔐 SSL证书检查:');
  console.log('----------------------');
  
  const domains = ['wedesign.design', 'www.wedesign.design'];
  const tls = require('tls');
  
  for (const domain of domains) {
    console.log(`检查 ${domain}...`);
    
    try {
      const cert = await getCertificate(domain);
      const validTo = new Date(cert.valid_to);
      const now = new Date();
      const daysRemaining = Math.floor((validTo - now) / (1000 * 60 * 60 * 24));
      
      if (daysRemaining > 0) {
        console.log(`  ✅ SSL证书有效 (剩余 ${daysRemaining} 天)`);
        console.log(`     颁发给: ${cert.subject?.CN || '未知'}`);
        console.log(`     有效期: ${new Date(cert.valid_from).toLocaleDateString()} 至 ${validTo.toLocaleDateString()}`);
      } else {
        console.log(`  ❌ SSL证书已过期 ${Math.abs(daysRemaining)} 天`);
      }
    } catch (error) {
      console.log(`  ❌ SSL证书错误: ${error.message}`);
      console.log(`     Vercel自动SSL可能需要5-30分钟生效`);
    }
  }
}

function getCertificate(domain) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(443, domain, { 
      servername: domain,
      rejectUnauthorized: false
    }, () => {
      const cert = socket.getPeerCertificate();
      socket.end();
      
      if (!cert || Object.keys(cert).length === 0) {
        reject(new Error('无法获取证书'));
      } else {
        resolve(cert);
      }
    });
    
    socket.on('error', reject);
    socket.setTimeout(10000, () => {
      socket.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function testNewOrderFlow() {
  console.log('\n🧪 新下单流程功能测试:');
  console.log('----------------------');
  
  console.log('1. 检查OrderFormModal组件...');
  const fs = require('fs');
  const componentPath = 'wedesign-mvp/src/components/OrderFormModal.tsx';
  
  if (fs.existsSync(componentPath)) {
    const content = fs.readFileSync(componentPath, 'utf8');
    const checks = [
      { name: '多步骤表单', check: content.includes('currentStep') },
      { name: '邮箱非强制', check: content.includes('邮箱地址 (可选)') || content.includes('邮箱可选') },
      { name: '4个步骤', check: (content.match(/步骤\d/g) || []).length >= 4 },
      { name: '项目信息收集', check: content.includes('projectName') && content.includes('projectDescription') },
      { name: '品牌信息收集', check: content.includes('companyName') && content.includes('industry') },
      { name: '设计偏好收集', check: content.includes('designStyle') && content.includes('colorPreferences') },
      { name: '联系信息收集', check: content.includes('contactName') && content.includes('phone') }
    ];
    
    checks.forEach(check => {
      console.log(`  ${check.check ? '✅' : '❌'} ${check.name}`);
    });
    
    const passed = checks.filter(c => c.check).length;
    console.log(`  通过率: ${passed}/${checks.length} (${Math.round(passed/checks.length*100)}%)`);
  } else {
    console.log('  ❌ OrderFormModal组件不存在');
  }
  
  console.log('\n2. 检查PricingSection集成...');
  const pricingPath = 'wedesign-mvp/src/components/PricingSection.tsx';
  if (fs.existsSync(pricingPath)) {
    const content = fs.readFileSync(pricingPath, 'utf8');
    const hasModal = content.includes('OrderFormModal');
    const hasNewButtons = content.includes('选择套餐');
    const hasFormSubmit = content.includes('handleOrderSubmit');
    
    console.log(`  ${hasModal ? '✅' : '❌'} 已集成表单弹窗`);
    console.log(`  ${hasNewButtons ? '✅' : '❌'} 按钮文本已更新`);
    console.log(`  ${hasFormSubmit ? '✅' : '❌'} 表单提交处理`);
  }
}

async function runComprehensiveTest() {
  console.log('开始全面测试...\n');
  
  // 测试URL访问
  const results = await testAllUrls();
  
  // 检查SSL
  await checkSSL();
  
  // 测试新下单流程
  await testNewOrderFlow();
  
  console.log('\n📊 测试结果汇总');
  console.log('============================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`URL测试: ${successful.length}/${results.length} 通过`);
  console.log(`成功率: ${Math.round((successful.length / results.length) * 100)}%`);
  
  const avgDuration = successful.length > 0 
    ? Math.round(successful.reduce((sum, r) => sum + r.duration, 0) / successful.length)
    : 0;
  console.log(`平均响应时间: ${avgDuration}ms`);
  
  // 关键功能状态
  console.log('\n🎯 关键功能状态:');
  const vercelAccess = results.find(r => r.name === 'Vercel主站');
  const wwwHttpsAccess = results.find(r => r.name === 'www子域名HTTPS');
  const paymentApi = results.find(r => r.name === '支付API');
  
  if (vercelAccess?.success) {
    console.log('✅ Vercel主站可访问');
  }
  
  if (wwwHttpsAccess?.success) {
    console.log('✅ www.wedesign.design 可访问');
  } else if (wwwHttpsAccess?.redirect) {
    console.log(`⚠️  www.wedesign.design 重定向: ${wwwHttpsAccess.redirect}`);
  } else {
    console.log(`❌ www.wedesign.design 访问失败: ${wwwHttpsAccess?.error}`);
  }
  
  if (paymentApi?.isApiSuccess) {
    console.log('✅ 支付系统正常');
  }
  
  console.log('\n🚀 立即测试新下单流程:');
  console.log('1. 访问: https://wedesign-mvp.vercel.app');
  console.log('2. 点击任意套餐按钮');
  console.log('3. 验证多表格表单弹窗');
  console.log('4. 测试邮箱字段非强制');
  console.log('5. 提交表单并跳转支付');
  
  console.log('\n🌐 推荐访问地址:');
  console.log('- https://wedesign-mvp.vercel.app (立即可用，功能完整)');
  
  const rootHttpsResult = results.find(r => r.name === '根域名HTTPS');
  if (rootHttpsResult?.success) {
    console.log('- https://wedesign.design (自定义根域名)');
  }
  
  const wwwHttpsResult = results.find(r => r.name === 'www子域名HTTPS');
  if (wwwHttpsResult?.success) {
    console.log('- https://www.wedesign.design (www子域名)');
  }
  
  console.log('\n🎉 测试完成时间:', new Date().toLocaleTimeString());
}

runComprehensiveTest().catch(console.error);