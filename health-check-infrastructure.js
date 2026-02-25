// 基础设施健康检查
const https = require('https');
const dns = require('dns').promises;
const { execSync } = require('child_process');

console.log('🌐 基础设施健康检查');
console.log('============================\n');

class InfrastructureChecker {
  constructor() {
    this.domains = [
      'wedesign.design',
      'www.wedesign.design',
      'wedesign-mvp.vercel.app'
    ];
    this.results = [];
  }

  async checkAll() {
    console.log('1. DNS解析检查...');
    await this.checkDNS();
    
    console.log('\n2. SSL证书检查...');
    await this.checkSSL();
    
    console.log('\n3. HTTP访问检查...');
    await this.checkHTTP();
    
    console.log('\n4. 服务器响应检查...');
    await this.checkServerResponse();
    
    console.log('\n5. 生成基础设施报告...');
    this.generateReport();
  }

  async checkDNS() {
    for (const domain of this.domains) {
      try {
        const addresses = await dns.resolve4(domain);
        const isVercel = addresses.some(ip => 
          ip === '76.76.21.21' || ip === '76.76.21.22' || ip === '76.223.102.42'
        );
        
        const result = {
          domain,
          dns: addresses.join(', '),
          isVercel,
          status: isVercel ? '✅' : '❌'
        };
        
        console.log(`   ${result.status} ${domain}: ${result.dns} ${isVercel ? '(Vercel)' : '(非Vercel)'}`);
        this.results.push({ ...result, check: 'DNS' });
        
      } catch (error) {
        console.log(`   ❌ ${domain}: DNS解析失败 - ${error.message}`);
        this.results.push({
          domain,
          dns: '失败',
          error: error.message,
          status: '❌',
          check: 'DNS'
        });
      }
    }
  }

  async checkSSL() {
    for (const domain of this.domains) {
      await new Promise(resolve => {
        const url = `https://${domain}`;
        const req = https.get(url, { 
          timeout: 10000,
          rejectUnauthorized: false // 允许自签名证书检查
        }, (res) => {
          const cert = res.socket.getPeerCertificate();
          const hasCert = cert && cert.subject;
          
          const result = {
            domain,
            ssl: hasCert ? '✅ 有效' : '❌ 无效',
            issuer: hasCert ? cert.issuer.CN : '无证书',
            validFrom: hasCert ? cert.valid_from : 'N/A',
            validTo: hasCert ? cert.valid_to : 'N/A'
          };
          
          console.log(`   ${result.ssl} ${domain}: ${result.issuer}`);
          this.results.push({ ...result, check: 'SSL' });
          resolve();
        });
        
        req.on('error', (error) => {
          console.log(`   ❌ ${domain}: SSL检查失败 - ${error.message}`);
          this.results.push({
            domain,
            ssl: '失败',
            error: error.message,
            status: '❌',
            check: 'SSL'
          });
          resolve();
        });
        
        req.on('timeout', () => {
          console.log(`   ⚠️  ${domain}: SSL检查超时`);
          this.results.push({
            domain,
            ssl: '超时',
            status: '⚠️',
            check: 'SSL'
          });
          req.destroy();
          resolve();
        });
        
        req.end();
      });
      
      // 避免请求过快
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  async checkHTTP() {
    for (const domain of this.domains) {
      await new Promise(resolve => {
        const url = `https://${domain}`;
        const startTime = Date.now();
        
        const req = https.get(url, { 
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }, (res) => {
          const responseTime = Date.now() - startTime;
          
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            const titleMatch = data.match(/<title>(.*?)<\/title>/i);
            const server = res.headers.server || '未知';
            
            const result = {
              domain,
              status: res.statusCode,
              statusText: res.statusMessage,
              responseTime: `${responseTime}ms`,
              server,
              title: titleMatch ? titleMatch[1].substring(0, 50) : '无标题',
              success: res.statusCode === 200
            };
            
            console.log(`   ${result.success ? '✅' : '❌'} ${domain}: ${result.status} ${result.statusText} (${result.responseTime})`);
            console.log(`       服务器: ${result.server}, 标题: ${result.title}`);
            this.results.push({ ...result, check: 'HTTP' });
            resolve();
          });
        });
        
        req.on('error', (error) => {
          console.log(`   ❌ ${domain}: HTTP访问失败 - ${error.message}`);
          this.results.push({
            domain,
            status: 0,
            statusText: `失败: ${error.message}`,
            responseTime: 'N/A',
            success: false,
            check: 'HTTP'
          });
          resolve();
        });
        
        req.on('timeout', () => {
          console.log(`   ⚠️  ${domain}: HTTP访问超时`);
          this.results.push({
            domain,
            status: 0,
            statusText: '超时',
            responseTime: 'N/A',
            success: false,
            check: 'HTTP'
          });
          req.destroy();
          resolve();
        });
        
        req.end();
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  async checkServerResponse() {
    console.log('   检查API端点...');
    
    const endpoints = [
      { path: '/', name: '首页' },
      { path: '/cases', name: '案例页面' },
      { path: '/admin', name: '管理后台' },
      { path: '/api/checkout', method: 'POST', name: '支付API' }
    ];
    
    for (const endpoint of endpoints) {
      const domain = 'wedesign.design'; // 使用主域名测试
      const url = `https://${domain}${endpoint.path}`;
      
      await new Promise(resolve => {
        const options = {
          timeout: 10000,
          method: endpoint.method || 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        };
        
        const req = https.request(url, options, (res) => {
          const result = {
            endpoint: endpoint.name,
            url: endpoint.path,
            status: res.statusCode,
            statusText: res.statusMessage,
            contentType: res.headers['content-type'] || '未知',
            success: res.statusCode < 400
          };
          
          console.log(`   ${result.success ? '✅' : '❌'} ${endpoint.name}: ${result.status} ${result.statusText}`);
          this.results.push({ ...result, check: 'API' });
          resolve();
        });
        
        req.on('error', (error) => {
          console.log(`   ❌ ${endpoint.name}: 访问失败 - ${error.message}`);
          this.results.push({
            endpoint: endpoint.name,
            url: endpoint.path,
            status: 0,
            statusText: `失败: ${error.message}`,
            success: false,
            check: 'API'
          });
          resolve();
        });
        
        req.on('timeout', () => {
          console.log(`   ⚠️  ${endpoint.name}: 访问超时`);
          this.results.push({
            endpoint: endpoint.name,
            url: endpoint.path,
            status: 0,
            statusText: '超时',
            success: false,
            check: 'API'
          });
          req.destroy();
          resolve();
        });
        
        if (endpoint.method === 'POST') {
          req.write(JSON.stringify({ test: true }));
        }
        
        req.end();
      });
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  generateReport() {
    const summary = {
      totalChecks: this.results.length,
      successful: this.results.filter(r => r.success !== false && r.status !== '❌').length,
      warnings: this.results.filter(r => r.status === '⚠️').length,
      failed: this.results.filter(r => r.success === false || r.status === '❌').length,
      domains: {}
    };
    
    // 按域名分组
    this.domains.forEach(domain => {
      const domainResults = this.results.filter(r => r.domain === domain);
      summary.domains[domain] = {
        total: domainResults.length,
        successful: domainResults.filter(r => r.success !== false && r.status !== '❌').length,
        failed: domainResults.filter(r => r.success === false || r.status === '❌').length
      };
    });
    
    console.log('\n📊 基础设施检查报告');
    console.log('='.repeat(60));
    console.log(`检查总数: ${summary.totalChecks}`);
    console.log(`✅ 成功: ${summary.successful}`);
    console.log(`⚠️  警告: ${summary.warnings}`);
    console.log(`❌ 失败: ${summary.failed}`);
    
    console.log('\n🌐 域名状态:');
    Object.entries(summary.domains).forEach(([domain, stats]) => {
      console.log(`   ${domain}: ${stats.successful}/${stats.total} 通过`);
    });
    
    // 显示关键问题
    const failures = this.results.filter(r => r.success === false || r.status === '❌');
    if (failures.length > 0) {
      console.log('\n🚨 关键问题:');
      failures.forEach(failure => {
        console.log(`   - ${failure.check}: ${failure.domain || failure.endpoint} - ${failure.statusText || failure.error}`);
      });
    }
    
    // 保存详细报告
    const report = {
      timestamp: new Date().toISOString(),
      summary,
      detailedResults: this.results,
      recommendations: this.getRecommendations()
    };
    
    require('fs').writeFileSync('infrastructure-health-report.json', JSON.stringify(report, null, 2));
    console.log('\n📁 详细报告已保存: infrastructure-health-report.json');
  }

  getRecommendations() {
    const recommendations = [];
    
    // 检查www域名问题
    const wwwResults = this.results.filter(r => r.domain === 'www.wedesign.design' && r.check === 'HTTP');
    const wwwFailed = wwwResults.some(r => r.status === 401);
    
    if (wwwFailed) {
      recommendations.push({
        priority: '高',
        issue: 'www.wedesign.design 返回401错误',
        action: '检查Vercel项目域名配置，联系Vercel支持',
        impact: '影响用户通过www域名访问'
      });
    }
    
    // 检查SSL证书
    const sslResults = this.results.filter(r => r.check === 'SSL');
    const sslIssues = sslResults.filter(r => r.ssl.includes('❌') || r.ssl.includes('失败'));
    
    if (sslIssues.length > 0) {
      recommendations.push({
        priority: '高',
        issue: 'SSL证书问题',
        action: '检查Vercel SSL证书配置',
        impact: '影响网站安全性'
      });
    }
    
    // 检查API端点
    const apiResults = this.results.filter(r => r.check === 'API' && !r.success);
    if (apiResults.length > 0) {
      recommendations.push({
        priority: '中',
        issue: 'API端点访问问题',
        action: '检查Next.js API路由配置',
        impact: '影响功能完整性'
      });
    }
    
    return recommendations;
  }
}

// 运行检查
const checker = new InfrastructureChecker();
checker.checkAll().catch(console.error);