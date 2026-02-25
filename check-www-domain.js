// 检查www域名问题
const https = require('https');
const dns = require('dns').promises;

console.log('🌐 检查www域名问题...');
console.log('============================\n');

async function checkDomain(domain) {
  console.log(`🔍 检查域名: ${domain}`);
  
  try {
    // 检查DNS解析
    const addresses = await dns.resolve4(domain);
    console.log(`   ✅ DNS解析: ${addresses.join(', ')}`);
    
    // 检查是否为Vercel IP
    const isVercel = addresses.some(ip => 
      ip === '76.76.21.21' || 
      ip === '76.76.21.22' || 
      ip === '76.223.102.42' ||
      ip === '204.69.207.1'
    );
    console.log(`   ${isVercel ? '✅' : '❌'} Vercel IP: ${isVercel ? '是' : '否'}`);
    
    // 检查HTTP访问
    await new Promise((resolve) => {
      const req = https.get(`https://${domain}`, { 
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }, (res) => {
        console.log(`   📡 HTTP状态: ${res.statusCode} ${res.statusMessage}`);
        console.log(`       服务器: ${res.headers.server || '未知'}`);
        console.log(`       内容类型: ${res.headers['content-type'] || '未知'}`);
        
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const titleMatch = data.match(/<title>(.*?)<\/title>/i);
          console.log(`       标题: ${titleMatch ? titleMatch[1].substring(0, 50) : '无标题'}`);
          resolve();
        });
      });
      
      req.on('error', (error) => {
        console.log(`   ❌ HTTP访问失败: ${error.message}`);
        resolve();
      });
      
      req.on('timeout', () => {
        console.log('   ⏰ HTTP访问超时');
        req.destroy();
        resolve();
      });
    });
    
  } catch (error) {
    console.log(`   ❌ 检查失败: ${error.message}`);
  }
  
  console.log('');
}

async function compareDomains() {
  console.log('📊 域名对比分析:');
  console.log('='.repeat(60));
  
  await checkDomain('wedesign.design');
  await checkDomain('www.wedesign.design');
  await checkDomain('wedesign-mvp.vercel.app');
  
  console.log('🔍 问题分析:');
  console.log('1. 如果www域名返回401，可能是Vercel项目配置问题');
  console.log('2. 需要检查Vercel项目中的域名别名配置');
  console.log('3. 可能需要重新部署或更新域名配置');
  console.log('');
  
  console.log('💡 解决方案:');
  console.log('1. 登录Vercel仪表盘: https://vercel.com');
  console.log('2. 进入wedesign-mvp项目');
  console.log('3. 检查"Settings" -> "Domains"');
  console.log('4. 确保以下域名都已添加:');
  console.log('   - wedesign.design');
  console.log('   - www.wedesign.design');
  console.log('5. 如果www域名有问题，尝试:');
  console.log('   a. 移除并重新添加域名');
  console.log('   b. 检查DNS配置');
  console.log('   c. 联系Vercel支持');
  
  console.log('\n📞 Vercel支持信息:');
  console.log('项目: wedesign-mvp');
  console.log('问题: www.wedesign.design returns 401, wedesign.design works');
  console.log('期望: Both domains should return 200 OK');
  console.log('DNS: Both resolve to Vercel IPs');
  console.log('SSL: Certificates are issued for both');
}

// 运行检查
compareDomains().catch(console.error);