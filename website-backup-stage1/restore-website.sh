#!/bin/bash
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
git commit -m "Restored from backup 2026-02-24T12-47-11-726Z"

echo "✅ 恢复完成!"
echo "📝 下一步:"
echo "   1. 配置 .env.local 文件"
echo "   2. 运行开发服务器: npm run dev"
echo "   3. 部署到Vercel: vercel --prod"
