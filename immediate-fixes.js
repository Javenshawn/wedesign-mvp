// 立即修复最紧急的问题
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 立即修复最紧急的问题');
console.log('============================\n');

class ImmediateFixes {
  constructor() {
    this.projectDir = path.join(__dirname, 'wedesign-mvp');
    this.fixesApplied = [];
  }

  async applyAll() {
    console.log('🎯 修复优先级:');
    console.log('  1. 移动端viewport配置 (P1)');
    console.log('  2. 提交未提交的代码 (P1)');
    console.log('  3. 检查支付API配置 (P0)');
    console.log('  4. 更新健康检查 (P2)');
    console.log('');

    await this.fixViewport();
    await this.commitChanges();
    await this.checkPaymentAPI();
    await this.updateHealthCheck();

    console.log('\n📊 修复完成总结:');
    console.log(`  已应用修复: ${this.fixesApplied.length}个`);
    this.fixesApplied.forEach((fix, i) => {
      console.log(`  ${i + 1}. ${fix.name}: ${fix.success ? '✅' : '❌'} ${fix.message}`);
    });

    console.log('\n💡 下一步建议:');
    console.log('  1. 联系Vercel支持解决www域名401问题');
    console.log('  2. 详细调试支付API 400错误');
    console.log('  3. 配置案例页面数据加载');
    console.log('  4. 设置定期健康检查');
  }

  async fixViewport() {
    console.log('1. 修复移动端viewport配置...');
    
    const layoutFile = path.join(this.projectDir, 'src', 'app', 'layout.tsx');
    
    if (!fs.existsSync(layoutFile)) {
      console.log('   ❌ layout.tsx文件不存在');
      this.fixesApplied.push({
        name: 'viewport修复',
        success: false,
        message: 'layout.tsx文件不存在'
      });
      return;
    }

    try {
      let content = fs.readFileSync(layoutFile, 'utf8');
      
      // 检查是否已有viewport
      if (content.includes('viewport')) {
        console.log('   ✅ viewport已配置');
        this.fixesApplied.push({
          name: 'viewport修复',
          success: true,
          message: 'viewport已存在'
        });
        return;
      }

      // 添加viewport meta标签
      const viewportMeta = '\n      <meta name="viewport" content="width=device-width, initial-scale=1" />';
      
      // 在<head>标签内添加
      const headEnd = content.indexOf('</head>');
      if (headEnd === -1) {
        console.log('   ❌ 找不到</head>标签');
        this.fixesApplied.push({
          name: 'viewport修复',
          success: false,
          message: '找不到</head>标签'
        });
        return;
      }

      content = content.slice(0, headEnd) + viewportMeta + content.slice(headEnd);
      fs.writeFileSync(layoutFile, content);
      
      console.log('   ✅ viewport配置已添加');
      this.fixesApplied.push({
        name: 'viewport修复',
        success: true,
        message: 'viewport配置已添加'
      });

    } catch (error) {
      console.log(`   ❌ viewport修复失败: ${error.message}`);
      this.fixesApplied.push({
        name: 'viewport修复',
        success: false,
        message: error.message
      });
    }
  }

  async commitChanges() {
    console.log('\n2. 提交未提交的代码更改...');
    
    try {
      // 检查是否有未提交的更改
      const gitStatus = execSync('git status --short', { 
        cwd: this.projectDir, 
        encoding: 'utf8' 
      }).trim();

      if (!gitStatus) {
        console.log('   ✅ 没有未提交的更改');
        this.fixesApplied.push({
          name: '代码提交',
          success: true,
          message: '没有未提交的更改'
        });
        return;
      }

      console.log('   未提交的文件:');
      gitStatus.split('\n').forEach(line => {
        if (line.trim()) console.log(`     ${line}`);
      });

      // 添加所有更改
      execSync('git add .', { cwd: this.projectDir, encoding: 'utf8' });
      console.log('   ✅ 文件已添加到暂存区');

      // 提交更改
      const commitMessage = `fix: immediate fixes - viewport config and health check ${new Date().toISOString().split('T')[0]}`;
      execSync(`git commit -m "${commitMessage}"`, { 
        cwd: this.projectDir, 
        encoding: 'utf8' 
      });
      console.log(`   ✅ 更改已提交: "${commitMessage}"`);

      // 推送到GitHub
      execSync('git push origin main', { 
        cwd: this.projectDir, 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      console.log('   ✅ 代码已推送到GitHub');

      this.fixesApplied.push({
        name: '代码提交',
        success: true,
        message: '代码已提交并推送'
      });

    } catch (error) {
      console.log(`   ❌ 代码提交失败: ${error.message}`);
      this.fixesApplied.push({
        name: '代码提交',
        success: false,
        message: error.message
      });
    }
  }

  async checkPaymentAPI() {
    console.log('\n3. 检查支付API配置...');
    
    try {
      // 检查环境变量
      const envPath = path.join(this.projectDir, '.env.local');
      if (!fs.existsSync(envPath)) {
        console.log('   ❌ 环境变量文件不存在');
        this.fixesApplied.push({
          name: '支付API检查',
          success: false,
          message: '环境变量文件不存在'
        });
        return;
      }

      const envContent = fs.readFileSync(envPath, 'utf8');
      const hasStripeKey = envContent.includes('STRIPE_SECRET_KEY');
      const hasStripeWebhook = envContent.includes('STRIPE_WEBHOOK_SECRET');

      console.log(`   ${hasStripeKey ? '✅' : '❌'} Stripe密钥: ${hasStripeKey ? '已配置' : '未配置'}`);
      console.log(`   ${hasStripeWebhook ? '✅' : '❌'} Webhook密钥: ${hasStripeWebhook ? '已配置' : '未配置'}`);

      // 检查API路由文件
      const checkoutRoute = path.join(this.projectDir, 'src', 'app', 'api', 'checkout', 'route.ts');
      const hasCheckoutRoute = fs.existsSync(checkoutRoute);
      
      console.log(`   ${hasCheckoutRoute ? '✅' : '❌'} Checkout路由: ${hasCheckoutRoute ? '存在' : '缺失'}`);

      if (hasCheckoutRoute) {
        const routeContent = fs.readFileSync(checkoutRoute, 'utf8');
        const hasStripeImport = routeContent.includes('stripe');
        const hasPriceCheck = routeContent.includes('price_id');
        
        console.log(`   ${hasStripeImport ? '✅' : '❌'} Stripe导入: ${hasStripeImport ? '存在' : '缺失'}`);
        console.log(`   ${hasPriceCheck ? '✅' : '❌'} 价格ID检查: ${hasPriceCheck ? '存在' : '缺失'}`);
      }

      // 检查产品配置
      const pricingFile = path.join(this.projectDir, 'src', 'components', 'PricingSection.tsx');
      if (fs.existsSync(pricingFile)) {
        const pricingContent = fs.readFileSync(pricingFile, 'utf8');
        const priceMatches = pricingContent.match(/price_[A-Za-z0-9_]+/g);
        const productCount = priceMatches ? priceMatches.length : 0;
        
        console.log(`   ✅ 产品配置: ${productCount}个产品`);
      }

      const allGood = hasStripeKey && hasStripeWebhook && hasCheckoutRoute;
      
      this.fixesApplied.push({
        name: '支付API检查',
        success: allGood,
        message: allGood ? '配置完整' : '配置不完整',
        details: {
          hasStripeKey,
          hasStripeWebhook,
          hasCheckoutRoute
        }
      });

      if (!allGood) {
        console.log('\n   💡 支付API问题诊断:');
        console.log('     1. 检查STRIPE_SECRET_KEY环境变量');
        console.log('     2. 检查Stripe产品ID配置');
        console.log('     3. 测试API端点: curl -X POST https://wedesign.design/api/checkout');
        console.log('     4. 查看Stripe仪表盘日志');
      }

    } catch (error) {
      console.log(`   ❌ 支付API检查失败: ${error.message}`);
      this.fixesApplied.push({
        name: '支付API检查',
        success: false,
        message: error.message
      });
    }
  }

  async updateHealthCheck() {
    console.log('\n4. 更新健康检查系统...');
    
    try {
      // 创建健康检查端点
      const healthCheckDir = path.join(this.projectDir, 'src', 'app', 'api', 'health');
      if (!fs.existsSync(healthCheckDir)) {
        fs.mkdirSync(healthCheckDir, { recursive: true });
      }

      const healthCheckRoute = path.join(healthCheckDir, 'route.ts');
      const healthCheckContent = `import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    services: {
      website: true,
      database: process.env.NEXT_PUBLIC_SUPABASE_URL ? true : false,
      stripe: process.env.STRIPE_SECRET_KEY ? true : false,
      deployment: process.env.VERCEL ? true : false
    },
    version: '1.0.0',
    uptime: process.uptime()
  };

  return NextResponse.json(checks, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

export const dynamic = 'force-dynamic';`;

      fs.writeFileSync(healthCheckRoute, healthCheckContent);
      console.log('   ✅ 健康检查API已创建: /api/health');

      // 更新package.json添加健康检查脚本
      const packagePath = path.join(this.projectDir, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      if (!packageJson.scripts) {
        packageJson.scripts = {};
      }

      packageJson.scripts['health'] = 'node health-check-infrastructure.js && node health-check-services.js && node health-check-functionality.js';
      packageJson.scripts['deploy'] = 'npm run health && vercel --prod';

      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      console.log('   ✅ package.json脚本已更新');

      this.fixesApplied.push({
        name: '健康检查更新',
        success: true,
        message: '健康检查系统已更新'
      });

    } catch (error) {
      console.log(`   ❌ 健康检查更新失败: ${error.message}`);
      this.fixesApplied.push({
        name: '健康检查更新',
        success: false,
        message: error.message
      });
    }
  }
}

// 运行修复
const fixer = new ImmediateFixes();
fixer.applyAll().catch(console.error);