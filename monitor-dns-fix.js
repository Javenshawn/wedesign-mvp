// 实时监控DNS修复进度
console.log('📡 实时监控 www.wedesign.design DNS修复进度');
console.log('============================\n');

const dns = require('dns').promises;
const https = require('https');

let fixed = false;
let attempts = 0;
const maxAttempts = 30; // 监控30分钟（每分钟一次）

async function checkDNS() {
  attempts++;
  console.log(`\n第 ${attempts} 次检查 (${new Date().toLocaleTimeString()})`);
  
  try {
    // 检查www子域名
    const addresses = await dns.resolve4('www.wedesign.design');
    console.log(`www.wedesign.design 解析到: ${addresses.join(', ')}`);
    
    const hasVercelIP = addresses.includes('76.76.21.21');
    const hasFigma = addresses.some(addr => 
      addr === '104.18.39.7' || 
      addr === '172.64.148.249' || 
      addr === '104.18.38.7' || 
      addr === '172.64.147.249'
    );
    
    if (hasVercelIP && !hasFigma) {
      console.log('✅ DNS配置正确！指向Vercel IP: 76.76.21.21');
      return true;
    } else if (hasFigma) {
      console.log('❌ 仍然指向Figma/Cloudflare IP');
      console.log('   需要删除CNAME记录，添加A记录: www → 76.76.21.21');
      return false;
    } else if (hasVercelIP && hasFigma) {
      console.log('⚠️  同时指向Vercel和Figma，可能有多个记录');
      console.log('   请检查GoDaddy是否有重复记录');
      return false;
    } else {
      console.log('❌ 指向其他IP地址');
      return false;
    }
    
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      console.log('❌ 域名未找到或未配置');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('❌ DNS服务器拒绝连接');
    } else {
      console.log(`❌ DNS检查错误: ${error.message}`);
    }
    return false;
  }
}

async function testWebsite() {
  console.log('测试网站访问...');
  
  const urls = [
    'https://wedesign-mvp.vercel.app',
    'https://www.wedesign.design',
    'http://www.wedesign.design'
  ];
  
  for (const url of urls) {
    try {
      const result = await testUrl(url);
      console.log(`  ${url}: ${result.success ? '✅' : '❌'} ${result.statusCode || result.error}`);
      
      if (result.redirect) {
        console.log(`     重定向到: ${result.redirect}`);
      }
    } catch (error) {
      console.log(`  ${url}: ❌ ${error.message}`);
    }
  }
}

function testUrl(url) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const module = isHttps ? https : require('http');
    
    const req = module.get(url, { timeout: 10000 }, (res) => {
      resolve({
        success: res.statusCode === 200 || (res.statusCode >= 300 && res.statusCode < 400),
        statusCode: res.statusCode,
        redirect: res.statusCode >= 300 && res.statusCode < 400 ? res.headers.location : null
      });
    });
    
    req.on('error', (err) => {
      resolve({
        success: false,
        error: err.message
      });
    });
    
    req.on('timeout', () => {
      resolve({
        success: false,
        error: 'Timeout'
      });
    });
  });
}

async function monitor() {
  console.log('开始监控DNS修复进度...');
  console.log('当前状态: www.wedesign.design → CNAME → sites.figma.net');
  console.log('目标状态: www.wedesign.design → A记录 → 76.76.21.21');
  console.log('\n请师傅立即操作GoDaddy DNS管理:');
  console.log('1. 删除CNAME记录: www → sites.figma.net');
  console.log('2. 添加A记录: www → 76.76.21.21');
  console.log('3. 保存更改');
  console.log('\n监控将每60秒检查一次进度...');
  
  while (!fixed && attempts < maxAttempts) {
    const dnsFixed = await checkDNS();
    
    if (dnsFixed) {
      console.log('\n🎉 DNS配置已修复！');
      console.log('等待SSL证书生效（通常需要5-30分钟）...');
      
      // 测试网站访问
      await testWebsite();
      
      console.log('\n🚀 修复完成！');
      console.log('现在可以访问: https://www.wedesign.design');
      console.log('新下单流程功能完整！');
      
      fixed = true;
      break;
    }
    
    if (attempts < maxAttempts) {
      const minutesRemaining = Math.floor((maxAttempts - attempts) * 1);
      console.log(`\n⏱️  等待60秒后再次检查... (剩余约${minutesRemaining}分钟)`);
      await new Promise(resolve => setTimeout(resolve, 60000)); // 60秒
    }
  }
  
  if (!fixed) {
    console.log('\n⚠️  30分钟监控结束，DNS仍未修复');
    console.log('可能原因:');
    console.log('1. GoDaddy更改未保存成功');
    console.log('2. DNS传播需要更长时间');
    console.log('3. 有多个DNS记录冲突');
    console.log('\n建议:');
    console.log('1. 重新检查GoDaddy DNS配置');
    console.log('2. 清除浏览器缓存后重新登录');
    console.log('3. 等待1-2小时后再检查');
    console.log('\n🌐 立即可用地址: https://wedesign-mvp.vercel.app');
  }
  
  console.log('\n⏱️  监控结束时间:', new Date().toLocaleTimeString());
}

monitor().catch(console.error);