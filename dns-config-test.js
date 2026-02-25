// DNS配置验证脚本
const dns = require('dns').promises;
const https = require('https');

console.log('🔍 DNS配置验证');
console.log('============================\n');

async function checkDNS() {
  console.log('1. 检查DNS解析...');
  
  try {
    const addresses = await dns.resolve4('wedesign.design');
    console.log(`  当前解析IP: ${addresses.join(', ')}`);
    
    const isVercelIP = addresses.some(ip => ip === '76.76.21.21');
    if (isVercelIP) {
      console.log('  ✅ 已正确指向Vercel (76.76.21.21)');
    } else {
      console.log('  ❌ 未指向Vercel，需要配置A记录到 76.76.21.21');
    }
    
    // 检查www子域名
    try {
      const wwwAddresses = await dns.resolve4('www.wedesign.design');
      console.log(`  www解析IP: ${wwwAddresses.join(', ')}`);
    } catch (e) {
      console.log('  ⚠️ www子域名未配置');
    }
    
    return addresses;
  } catch (error) {
    console.log(`  ❌ DNS解析失败: ${error.message}`);
    return [];
  }
}

async function testWebsite() {
  console.log('\n2. 测试网站访问...');
  
  const testUrls = [
    'https://wedesign.design',
    'https://www.wedesign.design',
    'https://wedesign-mvp.vercel.app' // 备用
  ];
  
  for (const url of testUrls) {
    console.log(`  测试 ${url}...`);
    
    await new Promise((resolve) => {
      const startTime = Date.now();
      const req = https.get(url, { timeout: 10000 }, (res) => {
        const duration = Date.now() - startTime;
        console.log(`    ✅ 状态码: ${res.statusCode}, 时间: ${duration}ms`);
        resolve();
      });
      
      req.on('error', (err) => {
        console.log(`    ❌ 访问失败: ${err.message}`);
        resolve();
      });
      
      req.on('timeout', () => {
        console.log(`    ⏱️  超时 (10秒)`);
        req.destroy();
        resolve();
      });
    });
    
    // 短暂延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function testSSL() {
  console.log('\n3. 测试SSL证书...');
  
  try {
    const tls = require('tls');
    const socket = tls.connect(443, 'wedesign.design', { servername: 'wedesign.design' }, () => {
      const cert = socket.getPeerCertificate();
      console.log(`  ✅ SSL证书有效`);
      console.log(`  颁发给: ${cert.subject.CN}`);
      console.log(`  颁发者: ${cert.issuer.CN}`);
      console.log(`  有效期: ${new Date(cert.valid_from).toLocaleDateString()} 至 ${new Date(cert.valid_to).toLocaleDateString()}`);
      socket.end();
    });
    
    socket.on('error', (err) => {
      console.log(`  ❌ SSL证书错误: ${err.message}`);
    });
    
    socket.setTimeout(5000, () => {
      console.log(`  ⏱️  SSL检查超时`);
      socket.destroy();
    });
  } catch (error) {
    console.log(`  ❌ SSL测试失败: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 开始DNS和网站配置验证\n');
  
  await checkDNS();
  await testWebsite();
  await testSSL();
  
  console.log('\n📋 配置检查清单:');
  console.log('============================');
  console.log('✅ GoDaddy DNS控制台访问权限');
  console.log('✅ 域名: wedesign.design');
  console.log('✅ Vercel IP: 76.76.21.21');
  console.log('');
  console.log('🔧 需要配置的记录:');
  console.log('1. A记录: @ → 76.76.21.21');
  console.log('2. A记录: www → 76.76.21.21');
  console.log('');
  console.log('⏱️  DNS传播时间:');
  console.log('- 通常: 5-30分钟');
  console.log('- 最长: 24-48小时');
  console.log('');
  console.log('📞 验证方法:');
  console.log('1. 配置后等待10分钟');
  console.log('2. 运行: nslookup wedesign.design');
  console.log('3. 检查是否返回 76.76.21.21');
  console.log('4. 访问 https://wedesign.design');
  
  console.log('\n🎯 成功标志:');
  console.log('✅ DNS解析到 76.76.21.21');
  console.log('✅ 网站可访问 (HTTPS)');
  console.log('✅ SSL证书有效');
  console.log('✅ 支付功能正常');
  
  console.log('\n🚀 立即开始配置！');
}

runTests().catch(console.error);