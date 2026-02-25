// 检查GoDaddy DNS配置
const dns = require('dns').promises;

console.log('🔍 检查GoDaddy DNS配置');
console.log('============================\n');

async function checkDNSRecords(domain) {
  console.log(`🌐 检查 ${domain} 的DNS记录:`);
  
  try {
    // A记录
    const aRecords = await dns.resolve4(domain);
    console.log(`   A记录: ${aRecords.join(', ')}`);
    
    // 检查是否为Vercel IP
    const vercelIPs = ['76.76.21.21', '76.76.21.22', '76.223.102.42'];
    const isVercel = aRecords.some(ip => vercelIPs.includes(ip));
    
    if (isVercel) {
      console.log('   ✅ 正确指向Vercel');
    } else {
      console.log('   ❌ 未指向Vercel IP');
      console.log(`      当前IP: ${aRecords[0]}`);
      console.log(`      应该指向: 76.76.21.21 或 76.76.21.22`);
    }
    
    return {
      domain,
      aRecords,
      isVercel,
      correct: isVercel
    };
    
  } catch (error) {
    console.log(`   ❌ DNS查询失败: ${error.message}`);
    return {
      domain,
      error: error.message,
      correct: false
    };
  }
}

async function checkAllDomains() {
  const domains = [
    'wedesign.design',
    'www.wedesign.design'
  ];
  
  const results = [];
  
  for (const domain of domains) {
    const result = await checkDNSRecords(domain);
    results.push(result);
    console.log('');
  }
  
  // 分析结果
  console.log('📊 DNS配置分析:');
  console.log('='.repeat(40));
  
  const allCorrect = results.every(r => r.correct);
  const someCorrect = results.some(r => r.correct);
  
  if (allCorrect) {
    console.log('✅ 所有域名DNS配置正确！');
    console.log('   问题可能在其他地方（Vercel配置、缓存等）');
  } else if (someCorrect) {
    console.log('⚠️  部分域名DNS配置正确');
    
    results.forEach(r => {
      if (r.correct) {
        console.log(`   ✅ ${r.domain}: 正确`);
      } else {
        console.log(`   ❌ ${r.domain}: 需要修复`);
        if (r.aRecords) {
          console.log(`      当前: ${r.aRecords[0]}`);
          console.log(`      应该: 76.76.21.21`);
        }
      }
    });
  } else {
    console.log('❌ 所有域名DNS配置都需要修复');
    
    console.log('\n🔧 GoDaddy DNS配置指南:');
    console.log('   登录GoDaddy账户 → 我的产品 → DNS管理');
    console.log('\n   需要设置的记录:');
    console.log('   ---------------------------------');
    console.log('   类型   名称           值');
    console.log('   ----   -----------    ----------');
    console.log('   A      @              76.76.21.21');
    console.log('   A      www            76.76.21.21');
    console.log('   或');
    console.log('   A      @              76.76.21.21');
    console.log('   CNAME  www            wedesign.design');
    console.log('   ---------------------------------');
    
    console.log('\n💡 重要提示:');
    console.log('   1. DNS更改需要时间传播（5分钟-48小时）');
    console.log('   2. 清除本地DNS缓存: ipconfig /flushdns');
    console.log('   3. 使用Google DNS测试: 8.8.8.8');
  }
  
  // 提供即时测试命令
  console.log('\n🚀 即时测试命令:');
  console.log('   nslookup wedesign.design 8.8.8.8');
  console.log('   nslookup www.wedesign.design 8.8.8.8');
  
  // 检查当前网络DNS
  console.log('\n🔍 当前网络DNS状态:');
  try {
    const os = require('os');
    const networkInterfaces = os.networkInterfaces();
    
    Object.keys(networkInterfaces).forEach(interfaceName => {
      networkInterfaces[interfaceName].forEach(interface => {
        if (interface.family === 'IPv4' && !interface.internal) {
          console.log(`   接口: ${interfaceName}`);
          console.log(`   IP: ${interface.address}`);
        }
      });
    });
  } catch (e) {
    console.log('   无法获取网络信息');
  }
  
  console.log('\n⏱️  检查完成时间:', new Date().toLocaleTimeString());
  
  return results;
}

// 运行检查
checkAllDomains().catch(console.error);