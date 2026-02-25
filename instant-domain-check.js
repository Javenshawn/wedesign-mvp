// 即时域名检查
const dns = require('dns').promises;
const https = require('https');

console.log('🔍 即时域名状态检查');
console.log('============================\n');

async function checkDomain(domain) {
  console.log(`🌐 检查 ${domain}:`);
  
  // 1. DNS解析
  try {
    const addresses = await dns.resolve4(domain);
    console.log(`   DNS解析: ${addresses.join(', ')}`);
    
    // 检查是否为Vercel IP
    const vercelIPs = ['76.76.21.21', '76.76.21.22', '76.223.102.42'];
    const isVercel = addresses.some(ip => vercelIPs.includes(ip));
    console.log(`   Vercel IP: ${isVercel ? '✅ 是' : '❌ 否'}`);
  } catch (dnsError) {
    console.log(`   DNS解析失败: ${dnsError.message}`);
  }
  
  // 2. HTTP访问
  await new Promise(resolve => {
    const url = `https://${domain}`;
    const req = https.get(url, { 
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      console.log(`   HTTP状态: ${res.statusCode} ${res.statusMessage}`);
      console.log(`   服务器: ${res.headers.server || '未知'}`);
      console.log(`   内容类型: ${res.headers['content-type'] || '未知'}`);
      
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>(.*?)<\/title>/i);
        if (titleMatch) {
          console.log(`   页面标题: ${titleMatch[1].substring(0, 60)}`);
        }
        resolve();
      });
    });
    
    req.on('error', (error) => {
      console.log(`   HTTP访问失败: ${error.message}`);
      resolve();
    });
    
    req.on('timeout', () => {
      console.log('   HTTP访问超时');
      req.destroy();
      resolve();
    });
  });
  
  console.log('');
}

async function runChecks() {
  const domains = [
    'wedesign.design',
    'www.wedesign.design',
    'wedesign-mvp.vercel.app'
  ];
  
  for (const domain of domains) {
    await checkDomain(domain);
    // 短暂延迟，避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 总结
  console.log('📊 检查总结:');
  console.log('='.repeat(40));
  
  // 检查DNS记录
  console.log('\n🔧 建议的DNS配置:');
  console.log('   wedesign.design    A     76.76.21.21');
  console.log('   www.wedesign.design CNAME wedesign.design');
  console.log('   或');
  console.log('   wedesign.design    A     76.76.21.21');
  console.log('   www.wedesign.design A     76.76.21.21');
  
  console.log('\n💡 如果 www.wedesign.design 仍然返回401:');
  console.log('   1. 等待DNS传播完成（最多24小时）');
  console.log('   2. 清除浏览器缓存');
  console.log('   3. 尝试不同网络环境');
  console.log('   4. 使用 https://wedesign.design 作为主域名');
  
  console.log('\n🚀 当前可用的访问方式:');
  console.log('   - https://wedesign.design (主域名)');
  console.log('   - https://wedesign-mvp.vercel.app (Vercel子域名)');
  
  console.log('\n⏱️  检查完成时间:', new Date().toLocaleTimeString());
}

runChecks().catch(console.error);