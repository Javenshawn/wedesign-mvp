// 修复 www.wedesign.design 401错误
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🔧 修复 www.wedesign.design 401错误');
console.log('============================\n');

class WWW401Fixer {
  constructor() {
    this.domain = 'www.wedesign.design';
    this.results = [];
  }

  async run() {
    console.log('1. 诊断问题...');
    await this.diagnoseProblem();
    
    console.log('\n2. 检查Vercel配置...');
    await this.checkVercelConfig();
    
    console.log('\n3. 修复配置问题...');
    await this.fixConfiguration();
    
    console.log('\n4. 验证修复...');
    await this.verifyFix();
    
    console.log('\n5. 生成报告...');
    this.generateReport();
  }

  async diagnoseProblem() {
    console.log(`  测试 ${this.domain}...`);
    
    // 测试HTTP访问
    const httpResult = await this.testHttpAccess();
    console.log(`  HTTP状态: ${httpResult.status} ${httpResult.message}`);
    
    if (httpResult.status === 401) {
      console.log('  ❌ 问题确认: 401 Unauthorized');
      console.log('     可能原因:');
      console.log('     1. Vercel项目保护设置');
      console.log('     2. 域名未正确绑定到项目');
      console.log('     3. SSL证书问题');
      console.log('     4. 访问控制列表(ACL)');
    }
    
    this.results.push({
      step: 'diagnosis',
      domain: this.domain,
      ...httpResult
    });
  }

  async checkVercelConfig() {
    console.log('  检查Vercel项目配置...');
    
    try {
      // 检查项目设置
      const projectInfo = execSync('npx vercel projects', { encoding: 'utf8' });
      console.log('  项目列表:');
      console.log(projectInfo);
      
      // 检查域名绑定
      const domains = execSync('npx vercel domains', { encoding: 'utf8' });
      console.log('  域名配置:');
      console.log(domains);
      
      // 检查别名
      const aliases = execSync('npx vercel alias ls', { encoding: 'utf8' });
      console.log('  别名配置:');
      const wwwAlias = aliases.split('\n').find(line => line.includes(this.domain));
      console.log(`  ${wwwAlias || '未找到www别名'}`);
      
      this.results.push({
        step: 'vercel_check',
        projectInfo,
        domains,
        wwwAlias: wwwAlias || 'not found'
      });
      
    } catch (error) {
      console.log(`  ❌ Vercel检查失败: ${error.message}`);
      this.results.push({
        step: 'vercel_check',
        error: error.message
      });
    }
  }

  async fixConfiguration() {
    console.log('  修复配置...');
    
    // 方案1: 重新设置别名
    console.log('  方案1: 重新设置别名...');
    try {
      const latestDeployment = 'wedesign-l3rnq7a7o-javen-shawns-projects.vercel.app';
      console.log(`    设置 ${latestDeployment} → ${this.domain}`);
      
      // 先移除可能存在的旧别名
      try {
        execSync(`npx vercel alias rm ${this.domain} --yes`, { 
          encoding: 'utf8',
          stdio: 'pipe'
        });
        console.log('    已移除旧别名');
      } catch (rmError) {
        console.log('    无旧别名可移除');
      }
      
      // 设置新别名
      const aliasResult = execSync(`npx vercel alias set ${latestDeployment} ${this.domain}`, {
        encoding: 'utf8',
        stdio: 'pipe'
      });
      console.log('    ✅ 别名设置成功');
      console.log(aliasResult);
      
      this.results.push({
        step: 'alias_fix',
        action: 'set_alias',
        success: true,
        output: aliasResult
      });
      
    } catch (aliasError) {
      console.log(`    ❌ 别名设置失败: ${aliasError.message}`);
      this.results.push({
        step: 'alias_fix',
        action: 'set_alias',
        success: false,
        error: aliasError.message
      });
    }
    
    // 方案2: 部署新版本
    console.log('\n  方案2: 部署新版本...');
    try {
      console.log('    创建临时文件以触发新部署...');
      
      // 创建一个小的更改来触发新部署
      const timestamp = new Date().toISOString();
      const tempFile = path.join(__dirname, 'wedesign-mvp', 'public', 'health-check.txt');
      
      fs.writeFileSync(tempFile, `Health check: ${timestamp}\nDomain: ${this.domain}\n`);
      console.log(`    创建健康检查文件: ${tempFile}`);
      
      // 提交更改
      execSync('git add .', { cwd: path.join(__dirname, 'wedesign-mvp'), encoding: 'utf8' });
      execSync(`git commit -m "fix: health check for ${this.domain}"`, { 
        cwd: path.join(__dirname, 'wedesign-mvp'), 
        encoding: 'utf8' 
      });
      
      console.log('    ✅ 更改已提交');
      
      this.results.push({
        step: 'deploy_prep',
        action: 'create_health_check',
        success: true,
        timestamp
      });
      
    } catch (deployError) {
      console.log(`    ⚠️  部署准备失败: ${deployError.message}`);
      this.results.push({
        step: 'deploy_prep',
        action: 'create_health_check',
        success: false,
        error: deployError.message
      });
    }
    
    // 方案3: 检查并修复vercel.json
    console.log('\n  方案3: 检查vercel.json配置...');
    const vercelJsonPath = path.join(__dirname, 'wedesign-mvp', 'vercel.json');
    
    if (fs.existsSync(vercelJsonPath)) {
      const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
      console.log('    当前vercel.json配置:');
      console.log(JSON.stringify(vercelConfig, null, 2));
      
      // 确保配置正确
      if (!vercelConfig.redirects) {
        vercelConfig.redirects = [];
      }
      
      // 添加www重定向
      vercelConfig.redirects.push({
        source: '/',
        destination: `https://${this.domain}`,
        permanent: true
      });
      
      fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2));
      console.log('    ✅ vercel.json已更新');
      
      this.results.push({
        step: 'vercel_json',
        action: 'update_config',
        success: true
      });
    }
  }

  async verifyFix() {
    console.log('  验证修复结果...');
    
    console.log('  等待10秒让配置生效...');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    console.log(`  测试 ${this.domain}...`);
    const testResult = await this.testHttpAccess();
    
    console.log(`  HTTP状态: ${testResult.status} ${testResult.message}`);
    
    if (testResult.status === 200) {
      console.log('  🎉 修复成功！www.wedesign.design 现在可以正常访问！');
    } else {
      console.log(`  ❌ 仍然有问题: ${testResult.status} ${testResult.message}`);
      console.log('     建议:');
      console.log('     1. 等待更长时间让DNS传播');
      console.log('     2. 检查GoDaddy DNS配置');
      console.log('     3. 联系Vercel支持');
    }
    
    this.results.push({
      step: 'verification',
      domain: this.domain,
      ...testResult,
      fixed: testResult.status === 200
    });
  }

  async testHttpAccess() {
    return new Promise((resolve) => {
      const url = `https://${this.domain}`;
      const startTime = Date.now();
      
      const req = https.get(url, { 
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      }, (res) => {
        const responseTime = Date.now() - startTime;
        
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const titleMatch = data.match(/<title>(.*?)<\/title>/i);
          resolve({
            status: res.statusCode,
            message: res.statusMessage,
            responseTime: `${responseTime}ms`,
            server: res.headers.server,
            title: titleMatch ? titleMatch[1] : 'No title',
            success: res.statusCode === 200
          });
        });
      });
      
      req.on('error', (error) => {
        resolve({
          status: 0,
          message: `连接失败: ${error.message}`,
          responseTime: 'N/A',
          server: 'N/A',
          title: 'N/A',
          success: false
        });
      });
      
      req.on('timeout', () => {
        req.destroy();
        resolve({
          status: 0,
          message: '连接超时',
          responseTime: 'N/A',
          server: 'N/A',
          title: 'N/A',
          success: false
        });
      });
      
      req.end();
    });
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      domain: this.domain,
      problem: '401 Unauthorized',
      steps: this.results,
      summary: {
        totalSteps: this.results.length,
        successful: this.results.filter(r => r.success !== false).length,
        failed: this.results.filter(r => r.success === false).length
      },
      finalStatus: this.results.find(r => r.step === 'verification')?.fixed ? 'FIXED' : 'NOT_FIXED',
      recommendations: this.getRecommendations()
    };

    const reportPath = path.join(__dirname, 'www-401-fix-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n📊 修复报告:');
    console.log('='.repeat(50));
    console.log(`域名: ${this.domain}`);
    console.log(`问题: 401 Unauthorized`);
    console.log(`最终状态: ${report.finalStatus}`);
    console.log(`步骤完成: ${report.summary.successful}/${report.summary.totalSteps}`);
    
    console.log('\n💡 建议:');
    report.recommendations.forEach((rec, i) => {
      console.log(`  ${i + 1}. ${rec}`);
    });
    
    console.log('\n📁 详细报告: www-401-fix-report.json');
  }

  getRecommendations() {
    const verification = this.results.find(r => r.step === 'verification');
    
    if (verification?.fixed) {
      return [
        'www.wedesign.design 已修复，可以正常访问',
        '建议将 www.wedesign.design 作为主推域名',
        '配置非www到www的301重定向',
        '更新所有宣传材料使用www域名'
      ];
    } else {
      return [
        '立即使用 wedesign.design 作为主域名',
        '等待24小时让DNS完全传播',
        '检查GoDaddy DNS配置是否正确',
        '如果急需www域名，考虑使用Cloudflare代理'
      ];
    }
  }
}

// 运行修复
const fixer = new WWW401Fixer();
fixer.run().catch(error => {
  console.error('❌ 修复失败:', error);
});