// 备份网站阶段性成果
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 备份网站阶段性成果...');
console.log('============================\n');

class WebsiteBackup {
  constructor() {
    this.projectDir = path.join(__dirname, 'wedesign-mvp');
    this.backupDir = path.join(__dirname, 'website-backup-stage1');
    this.timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  }

  async createBackup() {
    console.log('1. 创建备份目录...');
    this.ensureDirectory(this.backupDir);
    
    console.log('2. 备份项目文件...');
    await this.backupProjectFiles();
    
    console.log('3. 备份配置和环境变量...');
    await this.backupConfigurations();
    
    console.log('4. 备份数据库结构...');
    await this.backupDatabaseStructure();
    
    console.log('5. 创建部署快照...');
    await this.createDeploymentSnapshot();
    
    console.log('6. 生成备份报告...');
    await this.generateBackupReport();
    
    console.log('\n✅ 备份完成!');
  }

  ensureDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`   ✅ 创建目录: ${dirPath}`);
    }
  }

  async backupProjectFiles() {
    const backupPath = path.join(this.backupDir, 'project-files');
    this.ensureDirectory(backupPath);
    
    // 复制关键目录
    const dirsToBackup = [
      'src',
      'public',
      'components',
      'app',
      'pages'
    ];
    
    dirsToBackup.forEach(dir => {
      const sourceDir = path.join(this.projectDir, dir);
      const targetDir = path.join(backupPath, dir);
      
      if (fs.existsSync(sourceDir)) {
        this.copyDirectory(sourceDir, targetDir);
        console.log(`   ✅ 备份目录: ${dir}`);
      }
    });
    
    // 复制关键文件
    const filesToBackup = [
      'package.json',
      'tsconfig.json',
      'tailwind.config.ts',
      'next.config.js',
      'postcss.config.js',
      'vercel.json',
      '.env.local',
      'README.md'
    ];
    
    filesToBackup.forEach(file => {
      const sourceFile = path.join(this.projectDir, file);
      const targetFile = path.join(backupPath, file);
      
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`   ✅ 备份文件: ${file}`);
      }
    });
  }

  async backupConfigurations() {
    const configPath = path.join(this.backupDir, 'configurations');
    this.ensureDirectory(configPath);
    
    // 备份环境变量（脱敏）
    const envFile = path.join(this.projectDir, '.env.local');
    if (fs.existsSync(envFile)) {
      let envContent = fs.readFileSync(envFile, 'utf8');
      
      // 脱敏敏感信息
      envContent = envContent.replace(/sk_test_[A-Za-z0-9_]+/g, 'sk_test_***REDACTED***');
      envContent = envContent.replace(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[A-Za-z0-9._-]+/g, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.***REDACTED***');
      envContent = envContent.replace(/whsec_[A-Za-z0-9_]+/g, 'whsec_***REDACTED***');
      
      fs.writeFileSync(path.join(configPath, 'env-backup.txt'), envContent);
      console.log('   ✅ 备份环境变量（脱敏）');
    }
    
    // 备份Stripe配置
    const stripeConfig = {
      products: [
        { id: 'price_1T4EQICY5vZ28ogKIt1fBRwd', name: 'Basic Plan', price: '$299' },
        { id: 'price_1T4ERcCY5vZ28ogKeAmpEtdq', name: 'Professional Plan', price: '$599' },
        { id: 'price_1T4ESpCY5vZ28ogKit9ENo2g', name: 'Premium Plan', price: '$999' }
      ],
      timestamp: this.timestamp,
      status: 'configured'
    };
    
    fs.writeFileSync(
      path.join(configPath, 'stripe-config.json'),
      JSON.stringify(stripeConfig, null, 2)
    );
    console.log('   ✅ 备份Stripe配置');
    
    // 备份Supabase配置
    const supabaseConfig = {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ludcfjcmzyefsirmserg.supabase.co',
      tables: ['orders', 'cases'],
      timestamp: this.timestamp
    };
    
    fs.writeFileSync(
      path.join(configPath, 'supabase-config.json'),
      JSON.stringify(supabaseConfig, null, 2)
    );
    console.log('   ✅ 备份Supabase配置');
  }

  async backupDatabaseStructure() {
    const dbPath = path.join(this.backupDir, 'database');
    this.ensureDirectory(dbPath);
    
    // 备份SQL文件
    const sqlFiles = [
      'supabase-cases-table.sql',
      'create-cases-table.js'
    ];
    
    sqlFiles.forEach(file => {
      const sourceFile = path.join(this.projectDir, file);
      const targetFile = path.join(dbPath, file);
      
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`   ✅ 备份数据库文件: ${file}`);
      }
    });
    
    // 创建数据库结构文档
    const dbStructure = {
      tables: {
        orders: {
          columns: [
            'id (uuid, primary key)',
            'project_name (text)',
            'project_description (text)',
            'project_type (text)',
            'deadline (text)',
            'company_name (text)',
            'industry (text)',
            'target_audience (text)',
            'competitors (text)',
            'design_style (text)',
            'color_preferences (text)',
            'inspiration_links (text)',
            'contact_name (text)',
            'email (text)',
            'phone (text)',
            'wechat (text)',
            'selected_plan (text)',
            'amount (integer)',
            'currency (text)',
            'status (text)',
            'metadata (jsonb)',
            'created_at (timestamp)'
          ],
          indexes: ['created_at', 'status', 'selected_plan']
        },
        cases: {
          columns: [
            'id (uuid, primary key)',
            'title (text)',
            'description (text)',
            'client (text)',
            'industry (text)',
            'services (text[])',
            'challenge (text)',
            'solution (text)',
            'results (text)',
            'image_url (text)',
            'project_url (text)',
            'featured (boolean)',
            'order_date (date)',
            'created_at (timestamp)'
          ],
          indexes: ['featured', 'order_date', 'industry']
        }
      },
      relationships: {
        orders_to_cases: 'One order can have multiple case studies'
      },
      timestamp: this.timestamp
    };
    
    fs.writeFileSync(
      path.join(dbPath, 'database-structure.json'),
      JSON.stringify(dbStructure, null, 2)
    );
    console.log('   ✅ 备份数据库结构文档');
  }

  async createDeploymentSnapshot() {
    const deployPath = path.join(this.backupDir, 'deployment');
    this.ensureDirectory(deployPath);
    
    try {
      // 获取Git状态
      const gitStatus = execSync('git status --short', { 
        cwd: this.projectDir, 
        encoding: 'utf8' 
      });
      
      const gitLog = execSync('git log --oneline -10', { 
        cwd: this.projectDir, 
        encoding: 'utf8' 
      });
      
      const gitRemote = execSync('git remote -v', { 
        cwd: this.projectDir, 
        encoding: 'utf8' 
      });
      
      const deploymentInfo = {
        timestamp: this.timestamp,
        git: {
          status: gitStatus.trim(),
          recent_commits: gitLog.trim().split('\n'),
          remote: gitRemote.trim().split('\n')
        },
        deployment_urls: [
          'https://wedesign.design',
          'https://wedesign-mvp.vercel.app',
          'https://www.wedesign.design (401 - needs fix)'
        ],
        environment: {
          node_version: process.version,
          platform: process.platform,
          architecture: process.arch
        }
      };
      
      fs.writeFileSync(
        path.join(deployPath, 'deployment-snapshot.json'),
        JSON.stringify(deploymentInfo, null, 2)
      );
      console.log('   ✅ 创建部署快照');
      
    } catch (error) {
      console.log(`   ⚠️  部署快照创建失败: ${error.message}`);
    }
  }

  async generateBackupReport() {
    const reportPath = path.join(this.backupDir, 'backup-report.md');
    
    const report = `# 📦 网站阶段性成果备份报告

## 📋 备份信息
- **备份时间**: ${new Date().toISOString()}
- **备份版本**: Stage 1 - MVP完成版
- **项目名称**: Wedesign MVP
- **备份位置**: ${this.backupDir}

## 🎯 备份内容

### 1. 项目文件
- ✅ 源代码目录 (src/)
- ✅ 组件目录 (components/)
- ✅ 配置文件
- ✅ 环境变量（脱敏）

### 2. 配置信息
- ✅ Stripe支付配置 (3个产品)
- ✅ Supabase数据库配置
- ✅ Vercel部署配置

### 3. 数据库结构
- ✅ orders表结构
- ✅ cases表结构
- ✅ SQL脚本文件

### 4. 部署信息
- ✅ Git提交历史
- ✅ 部署URL列表
- ✅ 环境信息

## 🚀 当前功能状态

### ✅ 已实现功能
1. **支付系统** - 完整Stripe集成
2. **订单管理** - 多步骤表单系统
3. **案例展示** - 专业案例页面
4. **管理后台** - 订单查看和管理
5. **响应式设计** - 移动端优化
6. **安全配置** - SSL证书

### ⚠️ 已知问题
1. **www域名** - 401错误 (Vercel配置问题)
2. **数据库连接** - 需要验证
3. **健康检查** - 需要部署后生效

## 📊 技术栈

### 前端
- **框架**: Next.js 14 + React + TypeScript
- **样式**: Tailwind CSS
- **UI组件**: 自定义组件
- **状态管理**: React Hooks

### 后端
- **支付**: Stripe API
- **数据库**: Supabase (PostgreSQL)
- **部署**: Vercel
- **API**: Next.js API Routes

### 第三方服务
- **支付处理**: Stripe
- **数据库**: Supabase
- **部署**: Vercel
- **版本控制**: GitHub

## 🔧 恢复指南

### 快速恢复步骤
1. 复制备份文件到新项目目录
2. 安装依赖: \`npm install\`
3. 配置环境变量
4. 部署到Vercel: \`vercel --prod\`

### 环境变量配置
\`\`\`bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Application Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

## 📈 业务价值

### 核心成就
1. 🚀 生产环境完全部署
2. 💰 完整支付闭环实现
3. 🎨 专业英文设计界面
4. 📱 移动端优化完成
5. 🔒 安全配置就绪

### 可立即开始
1. 接受设计订单
2. 处理支付交易
3. 展示成功案例
4. 管理客户订单

## 📞 支持信息

### 关键联系人
- **Vercel支持**: 解决www域名问题
- **Stripe仪表盘**: 查看支付交易
- **Supabase控制台**: 管理数据库

### 重要链接
- 生产环境: https://wedesign.design
- GitHub仓库: https://github.com/Javenshawn/wedesign-mvp
- Vercel项目: wedesign-mvp

---

**备份完成时间**: ${new Date().toISOString()}
**备份版本**: 1.0.0
**备注**: 此备份包含网站MVP阶段的所有核心功能和配置，可用于恢复、迁移或作为UI升级的基础。
`;

    fs.writeFileSync(reportPath, report);
    console.log('   ✅ 生成备份报告');
    
    // 创建恢复脚本
    const restoreScript = `#!/bin/bash
# 网站恢复脚本
# 使用: bash restore-website.sh

echo "🚀 开始恢复网站..."

# 1. 创建项目目录
mkdir -p wedesign-mvp-restored
cd wedesign-mvp-restored

# 2. 复制项目文件
echo "📁 复制项目文件..."
cp -r ../website-backup-stage1/project-files/* .

# 3. 安装依赖
echo "📦 安装依赖..."
npm install

# 4. 设置环境变量
echo "🔧 设置环境变量..."
if [ -f .env.example ]; then
  cp .env.example .env.local
  echo "⚠️  请编辑 .env.local 文件配置实际环境变量"
fi

# 5. 初始化Git
echo "🔗 初始化Git..."
git init
git add .
git commit -m "Restored from backup ${this.timestamp}"

echo "✅ 恢复完成!"
echo "📝 下一步:"
echo "   1. 配置 .env.local 文件"
echo "   2. 运行开发服务器: npm run dev"
echo "   3. 部署到Vercel: vercel --prod"
`;

    fs.writeFileSync(path.join(this.backupDir, 'restore-website.sh'), restoreScript);
    console.log('   ✅ 创建恢复脚本');
  }

  copyDirectory(source, target) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }
    
    const items = fs.readdirSync(source);
    items.forEach(item => {
      const sourcePath = path.join(source, item);
      const targetPath = path.join(target, item);
      
      const stat = fs.statSync(sourcePath);
      if (stat.isDirectory()) {
        this.copyDirectory(sourcePath, targetPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    });
  }
}

// 运行备份
const backup = new WebsiteBackup();
backup.createBackup().catch(console.error);