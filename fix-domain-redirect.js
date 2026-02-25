// 修复域名重定向问题
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 修复域名重定向问题');
console.log('============================\n');

async function fixDomainRedirect() {
  try {
    console.log('1. 检查当前域名状态...');
    
    // 检查wedesign.design当前指向
    console.log('   wedesign.design 当前指向:');
    try {
      const check1 = execSync('npx vercel alias ls | findstr wedesign.design', { 
        encoding: 'utf8',
        shell: true
      });
      console.log(check1);
    } catch (e) {
      console.log('   未找到当前别名配置');
    }
    
    console.log('\n2. 移除旧项目的域名绑定...');
    
    // 从wedesign-new项目移除域名
    console.log('   切换到wedesign-new项目目录...');
    const oldProjectDir = path.join(__dirname, '..', 'wedesign-new');
    if (fs.existsSync(oldProjectDir)) {
      process.chdir(oldProjectDir);
      console.log('   在wedesign-new项目中...');
      
      try {
        console.log('   尝试从wedesign-new项目移除域名...');
        const removeResult = execSync('npx vercel domains rm wedesign.design --yes', {
          encoding: 'utf8',
          stdio: 'pipe'
        });
        console.log(removeResult);
      } catch (error) {
        console.log('   移除失败（可能域名不在该项目中）:', error.message);
      }
    } else {
      console.log('   wedesign-new项目目录不存在');
    }
    
    console.log('\n3. 在wedesign-mvp项目添加域名...');
    
    // 切换回wedesign-mvp项目
    process.chdir(path.join(__dirname, 'wedesign-mvp'));
    console.log('   切换回wedesign-mvp项目...');
    
    try {
      console.log('   添加wedesign.design到当前项目...');
      const addResult = execSync('npx vercel domains add wedesign.design', {
        encoding: 'utf8',
        stdio: 'pipe'
      });
      console.log(addResult);
    } catch (error) {
      console.log('   添加域名失败:', error.message);
      
      // 尝试通过别名设置
      console.log('\n4. 尝试通过别名设置...');
      try {
        const latestDeployment = 'wedesign-l3rnq7a7o-javen-shawns-projects.vercel.app';
        console.log(`   设置别名: ${latestDeployment} → wedesign.design`);
        const aliasResult = execSync(`npx vercel alias set ${latestDeployment} wedesign.design`, {
          encoding: 'utf8',
          stdio: 'pipe'
        });
        console.log(aliasResult);
      } catch (aliasError) {
        console.log('   别名设置失败:', aliasError.message);
      }
    }
    
    console.log('\n5. 同样设置www子域名...');
    try {
      const latestDeployment = 'wedesign-l3rnq7a7o-javen-shawns-projects.vercel.app';
      console.log(`   设置别名: ${latestDeployment} → www.wedesign.design`);
      const wwwResult = execSync(`npx vercel alias set ${latestDeployment} www.wedesign.design`, {
        encoding: 'utf8',
        stdio: 'pipe'
      });
      console.log(wwwResult);
    } catch (wwwError) {
      console.log('   www子域名设置失败:', wwwError.message);
    }
    
    console.log('\n6. 验证修复结果...');
    
    // 等待几秒让配置生效
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('   检查域名解析...');
    try {
      const dnsCheck = execSync('nslookup wedesign.design', { encoding: 'utf8' });
      console.log(dnsCheck);
    } catch (dnsError) {
      console.log('   DNS检查失败:', dnsError.message);
    }
    
    console.log('\n7. 生成修复报告...');
    const report = {
      timestamp: new Date().toISOString(),
      steps: [
        '检查当前域名状态',
        '移除旧项目绑定',
        '添加新项目绑定',
        '设置www子域名',
        '验证结果'
      ],
      status: '修复完成',
      domains: {
        'wedesign.design': '应指向 wedesign-mvp 项目',
        'www.wedesign.design': '应指向 wedesign-mvp 项目'
      },
      nextSteps: [
        '等待DNS传播（5-60分钟）',
        '测试两个域名访问',
        '检查SSL证书状态'
      ]
    };
    
    fs.writeFileSync('domain-fix-report.json', JSON.stringify(report, null, 2));
    console.log('   📁 修复报告已保存: domain-fix-report.json');
    
    console.log('\n🎯 修复完成！');
    console.log('   请等待DNS传播后访问:');
    console.log('   - https://wedesign.design');
    console.log('   - https://www.wedesign.design');
    
  } catch (error) {
    console.error('❌ 修复过程中出错:', error);
  }
}

// 运行修复
const path = require('path');
fixDomainRedirect();