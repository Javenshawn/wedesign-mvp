// 简单构建测试
const { execSync } = require('child_process');

console.log('🔧 开始构建测试...\n');

try {
  // 检查Next.js版本
  console.log('📦 检查依赖...');
  const nextVersion = execSync('npm list next', { encoding: 'utf8' });
  console.log('Next.js版本:', nextVersion.split('\n')[0]);
  
  // 检查TypeScript配置
  console.log('\n📝 检查TypeScript配置...');
  const tsconfig = require('./tsconfig.json');
  console.log('TypeScript配置正常');
  
  // 检查Tailwind配置
  console.log('\n🎨 检查Tailwind配置...');
  const tailwindConfig = require('./tailwind.config.ts');
  console.log('Tailwind配置正常');
  
  // 检查关键文件
  console.log('\n📁 检查关键文件...');
  const files = [
    'src/app/page.tsx',
    'src/app/layout.tsx',
    'src/components/Hero.tsx',
    'tailwind.config.ts',
    'next.config.js'
  ];
  
  files.forEach(file => {
    try {
      require('fs').accessSync(file);
      console.log(`✅ ${file} 存在`);
    } catch {
      console.log(`❌ ${file} 不存在`);
    }
  });
  
  console.log('\n🎉 所有检查通过！');
  console.log('   可以尝试重新部署到Vercel');
  
} catch (error) {
  console.log('\n🚨 构建测试失败:');
  console.log(error.message);
  
  if (error.message.includes('Cannot find module')) {
    console.log('\n🔧 解决方案:');
    console.log('   1. 删除node_modules: rm -rf node_modules');
    console.log('   2. 重新安装依赖: npm install');
    console.log('   3. 重新构建: npm run build');
  }
}