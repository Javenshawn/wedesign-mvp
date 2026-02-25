
// 快速测试脚本
const https = require('https');

const domains = ['wedesign.design', 'www.wedesign.design', 'null'];

async function quickTest() {
  console.log('🚀 快速域名测试:');
  
  for (const domain of domains) {
    const url = `https://${domain}`;
    
    const promise = new Promise((resolve) => {
      const req = https.get(url, { timeout: 10000 }, (res) => {
        resolve({
          domain,
          status: res.statusCode,
          success: res.statusCode === 200
        });
      });
      
      req.on('error', () => {
        resolve({ domain, status: 0, success: false });
      });
      
      req.on('timeout', () => {
        req.destroy();
        resolve({ domain, status: 0, success: false });
      });
      
      req.end();
    });
    
    const result = await promise;
    console.log(`  ${result.success ? '✅' : '❌'} ${domain}: ${result.status}`);
  }
}

quickTest().catch(console.error);
