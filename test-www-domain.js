// 测试 www.wedesign.design
console.log('🔍 测试 www.wedesign.design 配置');
console.log('============================\n');

async function testDNS() {
  const dns = require('dns').promises;
  
  console.log('1. 检查DNS配置...');
  
  try {
    // 检查根域名
    const rootAddresses = await dns.resolve4('wedesign.design');
    console.log(`  根域名解析: ${rootAddresses.join(', ')}`);
    const rootHasVercel = rootAddresses.includes('76.76.21.21');
    
    // 检查www子域名
    let wwwAddresses = [];
    let wwwIsCNAME = false;
    try {
      wwwAddresses = await dns.resolve4('www.wedesign.design');
      console.log(`  www解析: ${wwwAddresses.join(', ')}`);
    } catch (error) {
      if (error.code === 'ENOTFOUND') {
        console.log('  www子域名: 未配置或解析失败');
      } else if (error.code === 'ECONNREFUSED') {
        console.log('  www子域名: DNS服务器拒绝连接');
      } else {
        console.log(`  www子域名错误: ${error.message}`);
      }
    }
    
    // 检查CNAME
    try {
      const cnameRecords = await dns.resolveCname('www.wedesign.design');
      if (cnameRecords.length > 0) {
        console.log(`  ❌ 配置为CNAME: ${cnameRecords.join(', ')}`);
        console.log(`  需要改为A记录指向 76.76.21.21`);
        wwwIsCNAME = true;
      }
    } catch (error) {
      // 没有CNAME记录是正常的
    }
    
    console.log('\n📋 DNS配置状态:');
    if (rootHasVercel && !wwwIsCNAME) {
      console.log('✅ 根域名配置正确');
      if (wwwAddresses.length > 0 && wwwAddresses.includes('76.76.21.21')) {
        console.log('✅ www子域名配置正确');
        return true;
      } else {
        console.log('❌ www子域名需要配置A记录');
        return false;
      }
    } else if (wwwIsCNAME) {
      console.log('❌ www子域名配置为CNAME，需要改为A记录');
      return false;
    } else {
      console.log('❌ 需要检查DNS配置');
      return false;
    }
    
  } catch (error) {
    console.log(`❌ DNS检查失败: ${error.message}`);
    return false;
  }
}

async function testWebsite() {
  console.log('\n2. 测试网站访问...');
  
  const testUrls = [
    'https://wedesign-mvp.vercel.app',
    'http://www.wedesign.design',
    'https://www.wedesign.design'
  ];
  
  const https = require('https');
  const http = require('http');
  
  for (const url of testUrls) {
    console.log(`  测试 ${url}...`);
    
    const isHttps = url.startsWith('https://');
    const module = isHttps ? https : http;
    
    await new Promise((resolve) => {
      const startTime = Date.now();
      const req = module.get(url, { timeout: 10000 }, (res) => {
        const duration = Date.now() - startTime;
        console.log(`    ${isHttps ? '🔒' : '🌐'} ${res.statusCode} (${duration}ms)`);
        
        if (res.statusCode === 301 || res.statusCode === 302) {
          console.log(`    重定向到: ${res.headers.location}`);
        }
        
        // 检查内容
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (data.includes('Professional Design Services')) {
            console.log('    ✅ 网站内容正确');
          }
          resolve();
        });
      });
      
      req.on('error', (err) => {
        console.log(`    ❌ ${err.message}`);
        resolve();
      });
      
      req.on('timeout', () => {
        console.log(`    ⏱️  超时`);
        req.destroy();
        resolve();
      });
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function runTests() {
  console.log('🚀 开始 www.wedesign.design 测试\n');
  
  const dnsOk = await testDNS();
  
  if (!dnsOk) {
    console.log('\n❌ DNS配置需要修复！');
    console.log('\n请师傅立即操作GoDaddy:');
    console.log('1. 删除CNAME记录: www → sites.figma.net');
    console.log('2. 添加A记录: www → 76.76.21.21');
    console.log('3. 保存更改');
    console.log('4. 等待5分钟传播');
    console.log('\n当前正确配置应该是:');
    console.log('@ A 76.76.21.21');
    console.log('www A 76.76.21.21');
    return;
  }
  
  console.log('\n✅ DNS配置正确！开始测试网站...');
  await testWebsite();
  
  console.log('\n🎉 测试完成！');
  console.log('\n🌐 可用地址:');
  console.log('- https://wedesign-mvp.vercel.app (立即可用)');
  console.log('- https://www.wedesign.design (DNS配置后可用)');
  
  console.log('\n🚀 建议:');
  console.log('1. 先使用Vercel域名测试功能');
  console.log('2. 同时修复www子域名DNS');
  console.log('3. 等待DNS传播后测试自定义域名');
}

runTests().catch(console.error);