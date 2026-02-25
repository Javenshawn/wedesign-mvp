// 全面检查 www.wedesign.design
console.log('🔍 全面检查 www.wedesign.design');
console.log('============================\n');

const dns = require('dns').promises;
const https = require('https');
const http = require('http');

async function checkDNS() {
  console.log('1. DNS配置检查');
  console.log('----------------');
  
  try {
    // 检查根域名
    console.log('检查 wedesign.design...');
    const rootAddresses = await dns.resolve4('wedesign.design');
    console.log(`  ✅ 解析到: ${rootAddresses.join(', ')}`);
    const rootHasVercel = rootAddresses.includes('76.76.21.21');
    console.log(`  ${rootHasVercel ? '✅' : '❌'} 指向Vercel IP (76.76.21.21): ${rootHasVercel}`);
    
    // 检查www子域名
    console.log('\n检查 www.wedesign.design...');
    try {
      const wwwAddresses = await dns.resolve4('www.wedesign.design');
      console.log(`  ✅ 解析到: ${wwwAddresses.join(', ')}`);
      const wwwHasVercel = wwwAddresses.includes('76.76.21.21');
      console.log(`  ${wwwHasVercel ? '✅' : '❌'} 指向Vercel IP (76.76.21.21): ${wwwHasVercel}`);
    } catch (error) {
      console.log(`  ❌ 解析失败: ${error.message}`);
    }
    
    // 检查CNAME记录
    console.log('\n检查CNAME记录...');
    try {
      const cnameRecords = await dns.resolveCname('www.wedesign.design');
      if (cnameRecords.length > 0) {
        console.log(`  ❌ 配置为CNAME: ${cnameRecords.join(', ')}`);
        console.log(`  需要改为A记录指向 76.76.21.21`);
      } else {
        console.log('  ✅ 没有CNAME记录 (正确)');
      }
    } catch (error) {
      if (error.code === 'ENODATA') {
        console.log('  ✅ 没有CNAME记录 (正确)');
      } else {
        console.log(`  ⚠️  CNAME检查错误: ${error.message}`);
      }
    }
    
    // 检查MX记录（如果有）
    console.log('\n检查MX记录...');
    try {
      const mxRecords = await dns.resolveMx('wedesign.design');
      if (mxRecords.length > 0) {
        console.log(`  ⚠️  有MX记录: ${mxRecords.map(mx => `${mx.priority} ${mx.exchange}`).join(', ')}`);
        console.log(`  注意: MX记录可能影响邮件服务，但不影响网站访问`);
      } else {
        console.log('  ✅ 没有MX记录 (正常)');
      }
    } catch (error) {
      if (error.code === 'ENODATA') {
        console.log('  ✅ 没有MX记录 (正常)');
      }
    }
    
    return { rootHasVercel, wwwHasVercel: await checkWWWHasVercel() };
    
  } catch (error) {
    console.log(`❌ DNS检查失败: ${error.message}`);
    return { rootHasVercel: false, wwwHasVercel: false };
  }
}

async function checkWWWHasVercel() {
  try {
    const addresses = await dns.resolve4('www.wedesign.design');
    return addresses.includes('76.76.21.21');
  } catch (error) {
    return false;
  }
}

async function testWebsiteAccess() {
  console.log('\n2. 网站访问测试');
  console.log('----------------');
  
  const testUrls = [
    { name: 'Vercel主站', url: 'https://wedesign-mvp.vercel.app', expected: 200 },
    { name: '根域名HTTPS', url: 'https://wedesign.design', expected: 200 },
    { name: '根域名HTTP', url: 'http://wedesign.design', expected: 200 },
    { name: 'www子域名HTTPS', url: 'https://www.wedesign.design', expected: 200 },
    { name: 'www子域名HTTP', url: 'http://www.wedesign.design', expected: 200 }
  ];
  
  const results = [];
  
  for (const test of testUrls) {
    console.log(`测试 ${test.name} (${test.url})...`);
    
    const result = await testUrl(test.url);
    results.push({ ...test, ...result });
    
    if (result.success) {
      console.log(`  ✅ ${result.statusCode} (${result.duration}ms)`);
      if (result.redirect) {
        console.log(`     重定向到: ${result.redirect}`);
      }
    } else {
      console.log(`  ❌ ${result.error || `状态码: ${result.statusCode}`}`);
    }
    
    // 短暂延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

async function testUrl(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const isHttps = url.startsWith('https://');
    const module = isHttps ? https : http;
    
    const req = module.get(url, { timeout: 10000 }, (res) => {
      const duration = Date.now() - startTime;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          success: res.statusCode === 200 || (res.statusCode >= 300 && res.statusCode < 400),
          statusCode: res.statusCode,
          duration,
          redirect: res.statusCode >= 300 && res.statusCode < 400 ? res.headers.location : null,
          hasContent: data.includes('Professional Design Services') || data.includes('Wedesign')
        });
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
  });
}

async function checkSSL() {
  console.log('\n3. SSL证书检查');
  console.log('----------------');
  
  const domains = ['wedesign.design', 'www.wedesign.design'];
  const tls = require('tls');
  
  for (const domain of domains) {
    console.log(`检查 ${domain} SSL证书...`);
    
    try {
      const cert = await getCertificate(domain);
      console.log(`  ✅ SSL证书有效`);
      console.log(`     颁发给: ${cert.subject.CN || '未知'}`);
      console.log(`     颁发者: ${cert.issuer.CN || '未知'}`);
      console.log(`     有效期: ${cert.valid_from} 至 ${cert.valid_to}`);
      
      const validTo = new Date(cert.valid_to);
      const now = new Date();
      const daysRemaining = Math.floor((validTo - now) / (1000 * 60 * 60 * 24));
      
      if (daysRemaining < 30) {
        console.log(`     ⚠️  证书将在 ${daysRemaining} 天后过期`);
      } else {
        console.log(`     ✅ 证书剩余 ${daysRemaining} 天`);
      }
      
    } catch (error) {
      console.log(`  ❌ SSL证书错误: ${error.message}`);
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

async function runComprehensiveCheck() {
  console.log('开始全面检查 www.wedesign.design...\n');
  
  // 检查DNS
  const dnsResult = await checkDNS();
  
  // 检查网站访问
  const accessResults = await testWebsiteAccess();
  
  // 检查SSL
  await checkSSL();
  
  console.log('\n📊 检查结果汇总');
  console.log('============================');
  
  // DNS状态
  console.log('DNS配置状态:');
  console.log(`  wedesign.design → Vercel: ${dnsResult.rootHasVercel ? '✅' : '❌'}`);
  console.log(`  www.wedesign.design → Vercel: ${dnsResult.wwwHasVercel ? '✅' : '❌'}`);
  
  // 访问状态
  console.log('\n网站访问状态:');
  const successfulAccess = accessResults.filter(r => r.success);
  const failedAccess = accessResults.filter(r => !r.success);
  
  console.log(`  总测试: ${accessResults.length}`);
  console.log(`  成功: ${successfulAccess.length}`);
  console.log(`  失败: ${failedAccess.length}`);
  
  // 关键功能状态
  console.log('\n🎯 关键功能状态:');
  const vercelAccess = accessResults.find(r => r.name === 'Vercel主站');
  const wwwHttpsAccess = accessResults.find(r => r.name === 'www子域名HTTPS');
  
  if (vercelAccess?.success) {
    console.log('✅ Vercel主站可访问 (功能完整)');
  }
  
  if (wwwHttpsAccess?.success) {
    console.log('✅ www.wedesign.design 可访问');
  } else if (dnsResult.wwwHasVercel) {
    console.log('❌ DNS配置正确但网站无法访问 (可能是SSL证书问题)');
  } else {
    console.log('❌ www.wedesign.design 需要DNS配置');
  }
  
  // 建议
  console.log('\n🚀 建议:');
  
  if (!dnsResult.wwwHasVercel) {
    console.log('1. 🔧 修复GoDaddy DNS配置:');
    console.log('   - 删除CNAME记录: www → sites.figma.net');
    console.log('   - 添加A记录: www → 76.76.21.21');
    console.log('   - 保存并等待5-30分钟传播');
  }
  
  if (dnsResult.wwwHasVercel && !wwwHttpsAccess?.success) {
    console.log('1. 🔧 SSL证书问题:');
    console.log('   - Vercel自动SSL证书可能需要时间');
    console.log('   - 通常需要5-30分钟生效');
    console.log('   - 可以访问Vercel控制台检查证书状态');
  }
  
  console.log('\n2. 🌐 立即可用地址:');
  console.log('   - https://wedesign-mvp.vercel.app (功能完整)');
  
  if (dnsResult.rootHasVercel) {
    console.log('   - https://wedesign.design (根域名)');
  }
  
  console.log('\n3. ⏱️  等待时间:');
  if (!dnsResult.wwwHasVercel) {
    console.log('   - DNS配置后: 5-30分钟传播');
  }
  if (dnsResult.wwwHasVercel && !wwwHttpsAccess?.success) {
    console.log('   - SSL证书: 5-30分钟生效');
  }
  
  console.log('\n🎉 检查完成时间:', new Date().toLocaleTimeString());
}

runComprehensiveCheck().catch(console.error);