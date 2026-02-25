// 全面的DNS修复脚本
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌐 全面的DNS配置修复');
console.log('============================\n');

class DNSFixer {
  constructor() {
    this.results = [];
    this.domain = 'wedesign.design';
    this.vercelIPs = ['76.76.21.21', '76.76.21.22', '76.223.102.42'];
  }

  async run() {
    console.log('🔍 第1步：检查当前DNS状态');
    await this.checkCurrentDNS();
    
    console.log('\n🔧 第2步：检查Vercel配置');
    await this.checkVercelConfig();
    
    console.log('\n🚀 第3步：修复DNS配置');
    await this.fixDNSConfig();
    
    console.log('\n🧪 第4步：验证修复结果');
    await this.verifyFix();
    
    console.log('\n📊 第5步：生成修复报告');
    this.generateReport();
  }

  async checkCurrentDNS() {
    console.log('  检查域名解析...');
    
    const checks = [
      { domain: this.domain, type: 'A' },
      { domain: `www.${this.domain}`, type: 'A' },
      { domain: this.domain, type: 'CNAME' },
      { domain: this.domain, type: 'MX' },
      { domain: this.domain, type: 'TXT' }
    ];

    for (const check of checks) {
      try {
        const result = this.nslookup(check.domain, check.type);
        this.results.push({
          step: 'dns_check',
          domain: check.domain,
          type: check.type,
          result,
          status: 'success'
        });
        console.log(`    ${check.domain} (${check.type}): ${result}`);
      } catch (error) {
        this.results.push({
          step: 'dns_check',
          domain: check.domain,
          type: check.type,
          result: error.message,
          status: 'error'
        });
        console.log(`    ${check.domain} (${check.type}): ❌ ${error.message}`);
      }
    }
  }

  async checkVercelConfig() {
    console.log('  检查Vercel项目配置...');
    
    try {
      // 检查项目域名
      const domainsOutput = execSync('npx vercel domains', { encoding: 'utf8' });
      console.log('    Vercel域名配置:');
      console.log(domainsOutput);
      
      this.results.push({
        step: 'vercel_domains',
        result: domainsOutput,
        status: 'success'
      });
    } catch (error) {
      console.log(`    ❌ Vercel域名检查失败: ${error.message}`);
      this.results.push({
        step: 'vercel_domains',
        result: error.message,
        status: 'error'
      });
    }

    try {
      // 检查别名
      const aliasesOutput = execSync('npx vercel alias ls', { encoding: 'utf8' });
      console.log('    Vercel别名配置:');
      console.log(aliasesOutput);
      
      this.results.push({
        step: 'vercel_aliases',
        result: aliasesOutput,
        status: 'success'
      });
    } catch (error) {
      console.log(`    ❌ Vercel别名检查失败: ${error.message}`);
      this.results.push({
        step: 'vercel_aliases',
        result: error.message,
        status: 'error'
      });
    }
  }

  async fixDNSConfig() {
    console.log('  修复DNS配置...');
    
    // 1. 确保主域名指向最新部署
    const latestDeployment = 'wedesign-l3rnq7a7o-javen-shawns-projects.vercel.app';
    
    try {
      console.log(`    设置 ${this.domain} → ${latestDeployment}`);
      execSync(`npx vercel alias set ${latestDeployment} ${this.domain}`, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      console.log(`    ✅ ${this.domain} 别名设置成功`);
      
      this.results.push({
        step: 'alias_set',
        domain: this.domain,
        target: latestDeployment,
        status: 'success'
      });
    } catch (error) {
      console.log(`    ❌ ${this.domain} 别名设置失败: ${error.message}`);
      this.results.push({
        step: 'alias_set',
        domain: this.domain,
        target: latestDeployment,
        status: 'error',
        error: error.message
      });
    }

    // 2. 确保www子域名指向相同部署
    try {
      const wwwDomain = `www.${this.domain}`;
      console.log(`    设置 ${wwwDomain} → ${latestDeployment}`);
      execSync(`npx vercel alias set ${latestDeployment} ${wwwDomain}`, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      console.log(`    ✅ ${wwwDomain} 别名设置成功`);
      
      this.results.push({
        step: 'alias_set',
        domain: wwwDomain,
        target: latestDeployment,
        status: 'success'
      });
    } catch (error) {
      console.log(`    ❌ www子域名设置失败: ${error.message}`);
      this.results.push({
        step: 'alias_set',
        domain: `www.${this.domain}`,
        target: latestDeployment,
        status: 'error',
        error: error.message
      });
    }

    // 3. 检查SSL证书
    console.log('    检查SSL证书状态...');
    try {
      const certCheck = execSync(`npx vercel certs ls ${this.domain}`, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      console.log('    SSL证书状态:');
      console.log(certCheck);
      
      this.results.push({
        step: 'ssl_check',
        domain: this.domain,
        result: certCheck,
        status: 'success'
      });
    } catch (error) {
      console.log(`    ❌ SSL证书检查失败: ${error.message}`);
      this.results.push({
        step: 'ssl_check',
        domain: this.domain,
        result: error.message,
        status: 'error'
      });
    }
  }

  async verifyFix() {
    console.log('  验证DNS修复结果...');
    
    const domainsToCheck = [
      this.domain,
      `www.${this.domain}`
    ];

    for (const domain of domainsToCheck) {
      console.log(`    验证 ${domain}...`);
      
      try {
        // 检查DNS解析
        const dnsResult = this.nslookup(domain, 'A');
        console.log(`      DNS解析: ${dnsResult}`);
        
        // 检查HTTP访问
        const httpResult = await this.checkHttpAccess(domain);
        console.log(`      HTTP访问: ${httpResult}`);
        
        this.results.push({
          step: 'verification',
          domain,
          dns: dnsResult,
          http: httpResult,
          status: 'success'
        });
      } catch (error) {
        console.log(`      ❌ 验证失败: ${error.message}`);
        this.results.push({
          step: 'verification',
          domain,
          error: error.message,
          status: 'error'
        });
      }
    }
  }

  nslookup(domain, type = 'A') {
    try {
      const cmd = type === 'A' ? 
        `nslookup ${domain}` : 
        `nslookup -type=${type} ${domain}`;
      
      const output = execSync(cmd, { encoding: 'utf8' });
      
      // 提取IP地址
      const ipMatch = output.match(/Address:\s+(\d+\.\d+\.\d+\.\d+)/);
      if (ipMatch) {
        return ipMatch[1];
      }
      
      return output.split('\n').slice(-5).join(' ').trim();
    } catch (error) {
      throw new Error(`DNS查询失败: ${error.message}`);
    }
  }

  async checkHttpAccess(domain) {
    return new Promise((resolve) => {
      try {
        const url = `https://${domain}`;
        const https = require('https');
        
        const req = https.get(url, { timeout: 10000 }, (res) => {
          resolve(`✅ ${res.statusCode} ${res.statusMessage}`);
        });
        
        req.on('error', (error) => {
          resolve(`❌ 连接失败: ${error.message}`);
        });
        
        req.on('timeout', () => {
          req.destroy();
          resolve('❌ 连接超时');
        });
        
        req.end();
      } catch (error) {
        resolve(`❌ 检查失败: ${error.message}`);
      }
    });
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      domain: this.domain,
      results: this.results,
      summary: {
        totalChecks: this.results.length,
        success: this.results.filter(r => r.status === 'success').length,
        errors: this.results.filter(r => r.status === 'error').length
      }
    };

    const reportPath = path.join(__dirname, 'dns-fix-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n📊 DNS修复报告:');
    console.log('='.repeat(50));
    console.log(`域名: ${this.domain}`);
    console.log(`检查总数: ${report.summary.totalChecks}`);
    console.log(`成功: ${report.summary.success}`);
    console.log(`失败: ${report.summary.errors}`);
    
    // 显示关键结果
    const dnsResults = this.results.filter(r => r.step === 'verification');
    console.log('\n🌐 关键验证结果:');
    dnsResults.forEach(result => {
      console.log(`  ${result.domain}:`);
      console.log(`    DNS: ${result.dns || 'N/A'}`);
      console.log(`    HTTP: ${result.http || 'N/A'}`);
    });
    
    console.log('\n📁 详细报告已保存: dns-fix-report.json');
  }
}

// 运行修复
const fixer = new DNSFixer();
fixer.run().catch(error => {
  console.error('❌ DNS修复失败:', error);
});