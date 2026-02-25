// 服务集成健康检查
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 服务集成健康检查');
console.log('============================\n');

class ServicesChecker {
  constructor() {
    this.projectDir = path.join(__dirname, 'wedesign-mvp');
    this.results = [];
  }

  async checkAll() {
    console.log('1. Vercel部署状态检查...');
    await this.checkVercel();
    
    console.log('\n2. GitHub仓库状态检查...');
    await this.checkGitHub();
    
    console.log('\n3. Supabase连接检查...');
    await this.checkSupabase();
    
    console.log('\n4. Stripe配置检查...');
    await this.checkStripe();
    
    console.log('\n5. 环境变量检查...');
    await this.checkEnvironment();
    
    console.log('\n6. 生成服务集成报告...');
    this.generateReport();
  }

  async checkVercel() {
    try {
      console.log('   检查Vercel项目状态...');
      
      // 检查项目列表
      const projects = execSync('npx vercel projects', { encoding: 'utf8' });
      const hasWedesignMVP = projects.includes('wedesign-mvp');
      const hasWedesignNew = projects.includes('wedesign-new');
      
      console.log(`   ✅ Vercel项目: ${hasWedesignMVP ? 'wedesign-mvp存在' : 'wedesign-mvp不存在'}`);
      console.log(`   ℹ️  其他项目: ${hasWedesignNew ? 'wedesign-new存在' : 'wedesign-new不存在'}`);
      
      // 检查部署状态
      console.log('   检查最新部署...');
      const deployments = execSync('npx vercel list --limit 5', { encoding: 'utf8' });
      const lines = deployments.split('\n');
      const latestDeployments = lines.slice(2, 7); // 取前5个部署
      
      console.log('   最新部署:');
      latestDeployments.forEach(deploy => {
        if (deploy.trim()) console.log(`     ${deploy}`);
      });
      
      // 检查域名
      console.log('   检查域名配置...');
      const domains = execSync('npx vercel domains', { encoding: 'utf8' });
      console.log(`   ${domains.includes('wedesign.design') ? '✅' : '❌'} wedesign.design 已配置`);
      
      this.results.push({
        service: 'Vercel',
        projects: {
          'wedesign-mvp': hasWedesignMVP,
          'wedesign-new': hasWedesignNew
        },
        deployments: latestDeployments.filter(d => d.trim()).length,
        domains: domains.includes('wedesign.design'),
        status: '✅'
      });
      
    } catch (error) {
      console.log(`   ❌ Vercel检查失败: ${error.message}`);
      this.results.push({
        service: 'Vercel',
        error: error.message,
        status: '❌'
      });
    }
  }

  async checkGitHub() {
    try {
      console.log('   检查GitHub仓库状态...');
      
      // 检查本地Git状态
      const gitStatus = execSync('git status --short', { 
        cwd: this.projectDir, 
        encoding: 'utf8' 
      });
      
      const hasUncommitted = gitStatus.trim().length > 0;
      console.log(`   ${hasUncommitted ? '⚠️' : '✅'} 未提交更改: ${hasUncommitted ? '有' : '无'}`);
      
      // 检查提交历史
      const gitLog = execSync('git log --oneline -5', { 
        cwd: this.projectDir, 
        encoding: 'utf8' 
      });
      
      console.log('   最近提交:');
      gitLog.split('\n').filter(line => line.trim()).forEach(line => {
        console.log(`     ${line}`);
      });
      
      // 检查远程仓库
      const gitRemote = execSync('git remote -v', { 
        cwd: this.projectDir, 
        encoding: 'utf8' 
      });
      
      const hasOrigin = gitRemote.includes('origin');
      console.log(`   ${hasOrigin ? '✅' : '❌'} 远程仓库: ${hasOrigin ? '已配置' : '未配置'}`);
      
      this.results.push({
        service: 'GitHub',
        uncommitted: hasUncommitted,
        recentCommits: gitLog.split('\n').filter(line => line.trim()).length,
        hasRemote: hasOrigin,
        status: hasUncommitted ? '⚠️' : '✅'
      });
      
    } catch (error) {
      console.log(`   ❌ GitHub检查失败: ${error.message}`);
      this.results.push({
        service: 'GitHub',
        error: error.message,
        status: '❌'
      });
    }
  }

  async checkSupabase() {
    try {
      console.log('   检查Supabase配置...');
      
      // 检查环境变量
      const envPath = path.join(this.projectDir, '.env.local');
      let hasSupabaseEnv = false;
      let supabaseUrl = '';
      let supabaseKey = '';
      
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n');
        
        lines.forEach(line => {
          if (line.includes('NEXT_PUBLIC_SUPABASE_URL')) {
            supabaseUrl = line.split('=')[1]?.trim();
            hasSupabaseEnv = true;
          }
          if (line.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY')) {
            supabaseKey = line.split('=')[1]?.trim();
            hasSupabaseEnv = true;
          }
        });
      }
      
      console.log(`   ${hasSupabaseEnv ? '✅' : '❌'} Supabase环境变量: ${hasSupabaseEnv ? '已配置' : '未配置'}`);
      if (supabaseUrl) console.log(`      URL: ${supabaseUrl.substring(0, 30)}...`);
      if (supabaseKey) console.log(`      Key: ${supabaseKey.substring(0, 10)}...`);
      
      // 检查Supabase客户端配置
      const supabaseClientPath = path.join(this.projectDir, 'src', 'lib', 'supabase.ts');
      const hasClientConfig = fs.existsSync(supabaseClientPath);
      console.log(`   ${hasClientConfig ? '✅' : '❌'} Supabase客户端: ${hasClientConfig ? '已配置' : '未配置'}`);
      
      // 测试数据库连接（简单测试）
      if (hasSupabaseEnv && hasClientConfig) {
        console.log('   测试数据库连接...');
        // 这里可以添加实际的数据库连接测试
        console.log('   ⚠️  需要实际API调用来测试连接');
      }
      
      this.results.push({
        service: 'Supabase',
        hasEnv: hasSupabaseEnv,
        hasClient: hasClientConfig,
        status: hasSupabaseEnv && hasClientConfig ? '✅' : '❌'
      });
      
    } catch (error) {
      console.log(`   ❌ Supabase检查失败: ${error.message}`);
      this.results.push({
        service: 'Supabase',
        error: error.message,
        status: '❌'
      });
    }
  }

  async checkStripe() {
    try {
      console.log('   检查Stripe配置...');
      
      // 检查环境变量
      const envPath = path.join(this.projectDir, '.env.local');
      let hasStripeEnv = false;
      let stripeSecret = '';
      let stripeWebhook = '';
      
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n');
        
        lines.forEach(line => {
          if (line.includes('STRIPE_SECRET_KEY')) {
            stripeSecret = line.split('=')[1]?.trim();
            hasStripeEnv = true;
          }
          if (line.includes('STRIPE_WEBHOOK_SECRET')) {
            stripeWebhook = line.split('=')[1]?.trim();
            hasStripeEnv = true;
          }
        });
      }
      
      console.log(`   ${hasStripeEnv ? '✅' : '❌'} Stripe环境变量: ${hasStripeEnv ? '已配置' : '未配置'}`);
      if (stripeSecret) console.log(`      Secret Key: ${stripeSecret.substring(0, 10)}...`);
      if (stripeWebhook) console.log(`      Webhook Secret: ${stripeWebhook.substring(0, 10)}...`);
      
      // 检查Stripe API配置
      const checkoutPath = path.join(this.projectDir, 'src', 'app', 'api', 'checkout', 'route.ts');
      const hasCheckoutAPI = fs.existsSync(checkoutPath);
      console.log(`   ${hasCheckoutAPI ? '✅' : '❌'} Checkout API: ${hasCheckoutAPI ? '已配置' : '未配置'}`);
      
      const webhookPath = path.join(this.projectDir, 'src', 'app', 'api', 'webhook', 'route.ts');
      const hasWebhookAPI = fs.existsSync(webhookPath);
      console.log(`   ${hasWebhookAPI ? '✅' : '❌'} Webhook API: ${hasWebhookAPI ? '已配置' : '未配置'}`);
      
      // 检查产品配置
      const pricingPath = path.join(this.projectDir, 'src', 'components', 'PricingSection.tsx');
      let hasPricing = false;
      let productCount = 0;
      
      if (fs.existsSync(pricingPath)) {
        const pricingContent = fs.readFileSync(pricingPath, 'utf8');
        // 简单检查是否有价格配置
        hasPricing = pricingContent.includes('price_');
        const priceMatches = pricingContent.match(/price_[A-Za-z0-9_]+/g);
        productCount = priceMatches ? priceMatches.length : 0;
      }
      
      console.log(`   ${hasPricing ? '✅' : '❌'} 产品配置: ${hasPricing ? `已配置 ${productCount} 个产品` : '未配置'}`);
      
      this.results.push({
        service: 'Stripe',
        hasEnv: hasStripeEnv,
        hasCheckout: hasCheckoutAPI,
        hasWebhook: hasWebhookAPI,
        hasPricing,
        productCount,
        status: hasStripeEnv && hasCheckoutAPI ? '✅' : '❌'
      });
      
    } catch (error) {
      console.log(`   ❌ Stripe检查失败: ${error.message}`);
      this.results.push({
        service: 'Stripe',
        error: error.message,
        status: '❌'
      });
    }
  }

  async checkEnvironment() {
    try {
      console.log('   检查环境变量配置...');
      
      const envPath = path.join(this.projectDir, '.env.local');
      let envVars = [];
      
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
        
        envVars = lines.map(line => {
          const [key] = line.split('=');
          return key.trim();
        });
        
        console.log(`   ✅ 环境变量文件存在，包含 ${envVars.length} 个变量`);
        console.log('   关键变量:');
        
        const criticalVars = [
          'NEXT_PUBLIC_SUPABASE_URL',
          'NEXT_PUBLIC_SUPABASE_ANON_KEY',
          'STRIPE_SECRET_KEY',
          'STRIPE_WEBHOOK_SECRET'
        ];
        
        criticalVars.forEach(varName => {
          const hasVar = envVars.includes(varName);
          console.log(`     ${hasVar ? '✅' : '❌'} ${varName}`);
        });
      } else {
        console.log('   ❌ 环境变量文件不存在');
      }
      
      // 检查Next.js配置
      const nextConfigPath = path.join(this.projectDir, 'next.config.js');
      const hasNextConfig = fs.existsSync(nextConfigPath);
      console.log(`   ${hasNextConfig ? '✅' : '❌'} Next.js配置: ${hasNextConfig ? '已配置' : '未配置'}`);
      
      this.results.push({
        service: 'Environment',
        hasEnvFile: fs.existsSync(envPath),
        envVarCount: envVars.length,
        hasNextConfig,
        status: fs.existsSync(envPath) ? '✅' : '❌'
      });
      
    } catch (error) {
      console.log(`   ❌ 环境检查失败: ${error.message}`);
      this.results.push({
        service: 'Environment',
        error: error.message,
        status: '❌'
      });
    }
  }

  generateReport() {
    const summary = {
      totalServices: this.results.length,
      healthy: this.results.filter(r => r.status === '✅').length,
      warnings: this.results.filter(r => r.status === '⚠️').length,
      unhealthy: this.results.filter(r => r.status === '❌').length
    };
    
    console.log('\n📊 服务集成检查报告');
    console.log('='.repeat(60));
    console.log(`服务总数: ${summary.totalServices}`);
    console.log(`✅ 健康: ${summary.healthy}`);
    console.log(`⚠️  警告: ${summary.warnings}`);
    console.log(`❌ 不健康: ${summary.unhealthy}`);
    
    console.log('\n🔧 服务状态详情:');
    this.results.forEach(result => {
      console.log(`   ${result.status} ${result.service}`);
      if (result.error) {
        console.log(`     错误: ${result.error}`);
      }
    });
    
    // 显示关键配置
    console.log('\n🎯 关键配置状态:');
    
    const stripe = this.results.find(r => r.service === 'Stripe');
    if (stripe) {
      console.log(`   Stripe: ${stripe.hasPricing ? `✅ ${stripe.productCount}个产品` : '❌ 未配置'}`);
    }
    
    const supabase = this.results.find(r => r.service === 'Supabase');
    if (supabase) {
      console.log(`   Supabase: ${supabase.hasEnv ? '✅ 环境变量' : '❌ 未配置'}`);
    }
    
    // 保存详细报告
    const report = {
      timestamp: new Date().toISOString(),
      summary,
      services: this.results,
      recommendations: this.getRecommendations()
    };
    
    fs.writeFileSync('services-health-report.json', JSON.stringify(report, null, 2));
    console.log('\n📁 详细报告已保存: services-health-report.json');
  }

  getRecommendations() {
    const recommendations = [];
    
    // GitHub建议
    const github = this.results.find(r => r.service === 'GitHub');
    if (github && github.uncommitted) {
      recommendations.push({
        priority: '中',
        issue: '有未提交的代码更改',
        action: '提交并推送代码到GitHub',
        impact: '可能导致部署不一致'
      });
    }
    
    // Stripe建议
    const stripe = this.results.find(r => r.service === 'Stripe');
    if (stripe && !stripe.hasEnv) {
      recommendations.push({
        priority: '高',
        issue: 'Stripe环境变量未配置',
        action: '配置STRIPE_SECRET_KEY和STRIPE_WEBHOOK_SECRET',
        impact: '支付功能无法工作'
      });
    }
    
    // Supabase建议
    const supabase = this.results.find(r => r.service === 'Supabase');
    if (supabase && !supabase.hasEnv) {
      recommendations.push({
        priority: '高',
        issue: 'Supabase环境变量未配置',
        action: '配置NEXT_PUBLIC_SUPABASE_URL和NEXT_PUBLIC_SUPABASE_ANON_KEY',
        impact: '数据库功能无法工作'
      });
    }
    
    return recommendations;
  }
}

// 运行检查
const checker = new ServicesChecker();
checker.checkAll().catch(console.error);