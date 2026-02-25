// 检查是否是SSG问题
const fs = require('fs');
const path = require('path');

console.log('🔍 检查SSG/静态生成问题...\n');

const projectPath = path.join(__dirname, 'wedesign-mvp');

// 检查页面文件
const pages = [
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/cases/page.tsx',
  'src/app/admin/page.tsx'
];

console.log('📁 页面文件检查:');
pages.forEach(page => {
  const fullPath = path.join(projectPath, page);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasExport = content.includes('export const');
    const hasDynamic = content.includes('use client') || content.includes('useState');
    console.log(`   ${page}: ${hasExport ? '📄 有导出' : '📝 无导出'} | ${hasDynamic ? '⚡ 动态' : '📊 静态'}`);
  } else {
    console.log(`   ❌ ${page}: 不存在`);
  }
});

// 检查构建输出
const buildDir = path.join(projectPath, '.next');
if (fs.existsSync(buildDir)) {
  console.log('\n📦 构建输出检查:');
  
  // 检查静态文件
  const staticDir = path.join(buildDir, 'static');
  if (fs.existsSync(staticDir)) {
    const staticFiles = fs.readdirSync(staticDir);
    console.log(`   📁 静态文件: ${staticFiles.length}个文件`);
  }
  
  // 检查页面文件
  const pagesDir = path.join(buildDir, 'server', 'pages');
  if (fs.existsSync(pagesDir)) {
    const pageFiles = fs.readdirSync(pagesDir);
    console.log(`   📄 页面文件: ${pageFiles.length}个文件`);
    
    // 检查是否包含我们的组件
    const appPage = path.join(pagesDir, 'index.html');
    if (fs.existsSync(appPage)) {
      const content = fs.readFileSync(appPage, 'utf8');
      const hasComponents = content.includes('DesignProcess') || content.includes('Testimonials');
      console.log(`   🎯 组件渲染: ${hasComponents ? '✅ 已包含' : '❌ 未找到'}`);
    }
  }
} else {
  console.log('\n❌ 构建目录不存在，需要重新构建');
}

// 检查package.json脚本
const packagePath = path.join(projectPath, 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log('\n📦 构建脚本:');
  console.log(`   🚀 开发: ${pkg.scripts.dev}`);
  console.log(`   📦 构建: ${pkg.scripts.build}`);
  console.log(`   🏃 启动: ${pkg.scripts.start}`);
}

console.log('\n🔧 可能的SSG问题:');
console.log('   1. 页面被静态生成，但组件是客户端组件');
console.log('   2. "use client"指令可能有问题');
console.log('   3. Vercel可能缓存了旧的静态版本');
console.log('   4. 可能需要禁用SSG或使用动态渲染');

console.log('\n🚀 解决方案:');
console.log('   1. 在页面添加: export const dynamic = "force-dynamic"');
console.log('   2. 确保所有组件都有"use client"');
console.log('   3. 清除Vercel缓存并重新部署');
console.log('   4. 检查组件导入是否正确');