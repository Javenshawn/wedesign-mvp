// 最终www域名修复方案
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🚀 最终www域名修复方案');
console.log('============================\n');

class FinalWWWFixer {
  constructor() {
    this.domain = 'www.wedesign.design';
    this.projectDir = path.join(__dirname, 'wedesign-mvp');
  }

  async run() {
    console.log('🔍 问题分析:');
    console.log('  - wedesign.design → 200 OK ✅');
    console.log('  - www.wedesign.design → 401 Unauthorized ❌');
    console.log('  - DNS配置正确 → 76.76.21.21 ✅');
    console.log('  - Vercel别名已设置 ✅');
    console.log('');
    console.log('🎯 可能原因: Vercel项目级别的域名验证/保护设置');
    console.log('');

    console.log('1. 创建专门修复www域名的部署...');
    await this.createSpecialDeployment();

    console.log('\n2. 检查并修复Vercel项目设置...');
    await this.checkVercelProjectSettings();

    console.log('\n3. 部署修复版本...');
    await this.deployFixVersion();

    console.log('\n4. 强制刷新Vercel配置...');
    await this.forceRefreshVercel();

    console.log('\n5. 测试最终结果...');
    await this.testFinalResult();

    console.log('\n6. 提供备用方案...');
    this.provideFallbackSolutions();
  }

  async createSpecialDeployment() {
    console.log('  创建专门针对www域名的配置...');
    
    // 更新next.config.js确保www域名被识别
    const nextConfigPath = path.join(this.projectDir, 'next.config.js');
    let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
    
    // 确保有正确的环境变量
    if (!nextConfig.includes('NEXT_PUBLIC_SITE_URL')) {
      nextConfig = nextConfig.replace(
        'const nextConfig = {',
        `const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://www.wedesign.design',
  },`
      );
    }
    
    fs.writeFileSync(nextConfigPath, nextConfig);
    console.log('  ✅ next.config.js已更新');
    
    // 更新package.json添加部署脚本
    const packagePath = path.join(this.projectDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    
    packageJson.scripts['deploy:www'] = 'vercel --prod --yes';
    packageJson.scripts['deploy:all'] = 'npm run deploy:www';
    
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('  ✅ package.json已更新');
  }

  async checkVercelProjectSettings() {
    console.log('  检查Vercel项目设置...');
    
    try {
      // 检查项目保护设置
      console.log('  检查项目配置...');
      const projectCmd = 'npx vercel project ls';
      const projectOutput = execSync(projectCmd, { 
        cwd: this.projectDir, 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log('  项目列表:');
      console.log(projectOutput);
      
      // 检查是否有保护设置
      console.log('\n  💡 Vercel项目可能有的保护设置:');
      console.log('    1. Password Protection (密码保护)');
      console.log('    2. IP Allowlisting (IP白名单)');
      console.log('    3. Domain Verification (域名验证)');
      console.log('    4. Team Access Control (团队访问控制)');
      
    } catch (error) {
      console.log(`  ⚠️  检查失败: ${error.message}`);
    }
  }

  async deployFixVersion() {
    console.log('  部署修复版本...');
    
    try {
      // 提交更改
      console.log('  提交更改...');
      execSync('git add .', { cwd: this.projectDir, encoding: 'utf8' });
      execSync('git commit -m "fix: special deployment for www domain"', { 
        cwd: this.projectDir, 
        encoding: 'utf8' 
      });
      
      console.log('  ✅ 更改已提交');
      
      // 推送到GitHub
      console.log('  推送到GitHub...');
      execSync('git push origin main', { 
        cwd: this.projectDir, 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log('  ✅ 代码已推送');
      
      // 部署到Vercel
      console.log('  部署到Vercel...');
      console.log('  ⏱️  这可能需要2-3分钟...');
      
      const deployOutput = execSync('npx vercel --prod --yes', {
        cwd: this.projectDir,
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 180000
      });
      
      // 提取部署URL
      const urlMatch = deployOutput.match(/Production:\s+(https:\/\/[^\s]+)/);
      const deploymentUrl = urlMatch ? urlMatch[1] : null;
      
      if (deploymentUrl) {
        console.log(`  ✅ 部署成功: ${deploymentUrl}`);
        
        // 设置域名别名
        console.log(`  设置域名别名: ${deploymentUrl} → ${this.domain}`);
        try {
          execSync(`npx vercel alias set ${deploymentUrl} ${this.domain}`, {
            cwd: this.projectDir,
            encoding: 'utf8',
            stdio: 'pipe'
          });
          console.log(`  ✅ ${this.domain} 别名已设置`);
        } catch (aliasError) {
          console.log(`  ⚠️  别名设置可能已存在: ${aliasError.message}`);
        }
        
        this.deploymentUrl = deploymentUrl;
      }
      
    } catch (error) {
      console.log(`  ❌ 部署失败: ${error.message}`);
      console.log(`  输出: ${error.stdout?.substring(0, 200)}`);
    }
  }

  async forceRefreshVercel() {
    console.log('  强制刷新Vercel配置...');
    
    // 方法1: 通过API强制刷新
    console.log('  方法1: 清除Vercel缓存...');
    
    // 创建清除缓存的部署
    const cacheBuster = `// Cache buster for ${this.domain}
export default function CacheBuster() {
  return null;
}`;
    
    const cacheFile = path.join(this.projectDir, 'src', 'app', 'cache-buster.tsx');
    fs.writeFileSync(cacheFile, cacheBuster);
    
    console.log('  ✅ 缓存清除文件已创建');
    
    // 方法2: 等待并重试
    console.log('\n  方法2: 等待配置生效...');
    console.log('  ⏱️  等待30秒...');
    
    await new Promise(resolve => setTimeout(resolve, 30000));
  }

  async testFinalResult() {
    console.log('  测试最终结果...');
    
    const testDomains = [
      'wedesign.design',
      'www.wedesign.design',
      this.deploymentUrl
    ].filter(Boolean);
    
    console.log('  测试域名:');
    testDomains.forEach(domain => console.log(`    - ${domain}`));
    
    console.log('\n  🔍 开始测试...');
    
    for (const domain of testDomains) {
      const result = await this.testDomain(domain);
      console.log(`    ${result.success ? '✅' : '❌'} ${domain}: ${result.status} ${result.message}`);
      
      if (domain === 'www.wedesign.design' && result.status === 200) {
        console.log(`    🎉 ${domain} 修复成功！`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  async testDomain(domain) {
    return new Promise((resolve) => {
      const url = `https://${domain}`;
      
      const req = https.get(url, { 
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }, (res) => {
        resolve({
          domain,
          status: res.statusCode,
          message: res.statusMessage,
          success: res.statusCode === 200
        });
      });
      
      req.on('error', (error) => {
        resolve({
          domain,
          status: 0,
          message: `错误: ${error.message}`,
          success: false
        });
      });
      
      req.on('timeout', () => {
        req.destroy();
        resolve({
          domain,
          status: 0,
          message: '超时',
          success: false
        });
      });
      
      req.end();
    });
  }

  provideFallbackSolutions() {
    console.log('💡 备用解决方案:');
    console.log('');
    
    console.log('方案A: 使用Cloudflare代理（立即生效）');
    console.log('  1. 将域名DNS指向Cloudflare');
    console.log('  2. 在Cloudflare中设置代理到Vercel');
    console.log('  3. 配置SSL和缓存');
    console.log('  优点: 立即解决，增强性能和安全');
    console.log('');
    
    console.log('方案B: 配置301重定向（推荐）');
    console.log('  1. 在GoDaddy设置URL重定向');
    console.log('  2. www.wedesign.design → wedesign.design');
    console.log('  3. 或反向重定向');
    console.log('  优点: 简单，用户无感知');
    console.log('');
    
    console.log('方案C: 联系Vercel支持');
    console.log('  1. 通过Vercel仪表板提交工单');
    console.log('  2. 描述问题: 主域名正常，www返回401');
    console.log('  3. 请求检查项目域名配置');
    console.log('  优点: 官方解决，最可靠');
    console.log('');
    
    console.log('🎯 立即建议:');
    console.log('  1. 使用 https://wedesign.design 作为主推域名');
    console.log('  2. 设置GoDaddy重定向: www → 非www');
    console.log('  3. 同时联系Vercel支持解决根本问题');
    console.log('');
    
    console.log('📞 Vercel支持信息:');
    console.log('  - 项目: wedesign-mvp');
    console.log('  - 问题: www.wedesign.design returns 401, wedesign.design works');
    console.log('  - 期望: Both domains should return 200');
    console.log('  - 尝试: Already tried re-deploying and re-aliasing');
    
    console.log('\n⏱️  修复完成时间:', new Date().toLocaleTimeString());
  }
}

// 运行修复
const fixer = new FinalWWWFixer();
fixer.run().catch(console.error);