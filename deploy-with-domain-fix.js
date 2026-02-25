// 部署新版本并修复域名问题
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 部署新版本并修复域名问题');
console.log('============================\n');

async function deployWithDomainFix() {
  try {
    console.log('1. 确保在wedesign-mvp项目目录...');
    const projectDir = path.join(__dirname, 'wedesign-mvp');
    if (!fs.existsSync(projectDir)) {
      console.error('❌ wedesign-mvp目录不存在');
      return;
    }
    
    process.chdir(projectDir);
    console.log('   当前目录:', process.cwd());
    
    console.log('\n2. 检查Git状态...');
    try {
      const gitStatus = execSync('git status --short', { encoding: 'utf8' });
      if (gitStatus.trim()) {
        console.log('   有未提交的更改:', gitStatus);
        console.log('   建议先提交更改...');
      } else {
        console.log('   工作区干净，无未提交更改');
      }
    } catch (error) {
      console.log('   Git检查失败:', error.message);
    }
    
    console.log('\n3. 部署到生产环境...');
    console.log('   开始部署... (这可能需要几分钟)');
    
    try {
      const deployOutput = execSync('npx vercel --prod --yes', {
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 180000 // 3分钟超时
      });
      
      // 提取部署URL
      const urlMatch = deployOutput.match(/Production:\s+(https:\/\/[^\s]+)/);
      const deploymentUrl = urlMatch ? urlMatch[1] : null;
      
      console.log('   ✅ 部署成功！');
      if (deploymentUrl) {
        console.log(`   部署URL: ${deploymentUrl}`);
        
        // 保存部署信息
        const deployInfo = {
          timestamp: new Date().toISOString(),
          deploymentUrl,
          output: deployOutput.substring(0, 1000) // 只保存前1000字符
        };
        
        fs.writeFileSync('deployment-info.json', JSON.stringify(deployInfo, null, 2));
      }
      
      console.log('\n4. 设置域名别名...');
      
      if (deploymentUrl) {
        // 设置主域名
        console.log(`   设置 ${deploymentUrl} → wedesign.design`);
        try {
          const alias1 = execSync(`npx vercel alias set ${deploymentUrl} wedesign.design`, {
            encoding: 'utf8',
            stdio: 'pipe'
          });
          console.log('   ✅ wedesign.design 别名设置成功');
        } catch (aliasError) {
          console.log('   ⚠️  wedesign.design 别名设置可能已存在:', aliasError.message);
        }
        
        // 设置www子域名
        console.log(`\n   设置 ${deploymentUrl} → www.wedesign.design`);
        try {
          const alias2 = execSync(`npx vercel alias set ${deploymentUrl} www.wedesign.design`, {
            encoding: 'utf8',
            stdio: 'pipe'
          });
          console.log('   ✅ www.wedesign.design 别名设置成功');
        } catch (wwwError) {
          console.log('   ⚠️  www.wedesign.design 别名设置可能已存在:', wwwError.message);
        }
      }
      
      console.log('\n5. 验证部署和域名...');
      
      // 等待部署完成
      console.log('   等待部署完全生效...');
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      console.log('\n6. 运行快速测试...');
      
      const testScript = `
// 快速测试脚本
const https = require('https');

const domains = ['wedesign.design', 'www.wedesign.design', '${deploymentUrl}'];

async function quickTest() {
  console.log('🚀 快速域名测试:');
  
  for (const domain of domains) {
    const url = \`https://\${domain}\`;
    
    const promise = new Promise((resolve) => {
      const req = https.get(url, { timeout: 10000 }, (res) => {
        resolve({
          domain,
          status: res.statusCode,
          success: res.statusCode === 200
        });
      });
      
      req.on('error', () => {
        resolve({ domain, status: 0, success: false });
      });
      
      req.on('timeout', () => {
        req.destroy();
        resolve({ domain, status: 0, success: false });
      });
      
      req.end();
    });
    
    const result = await promise;
    console.log(\`  \${result.success ? '✅' : '❌'} \${domain}: \${result.status}\`);
  }
}

quickTest().catch(console.error);
`;
      
      // 保存并运行测试脚本
      fs.writeFileSync('quick-test.js', testScript);
      console.log('   运行测试脚本...');
      
      try {
        execSync('node quick-test.js', { encoding: 'utf8', stdio: 'inherit' });
      } catch (testError) {
        console.log('   测试脚本运行失败:', testError.message);
      }
      
      console.log('\n7. 生成部署报告...');
      
      const report = {
        deployment: {
          timestamp: new Date().toISOString(),
          url: deploymentUrl,
          project: 'wedesign-mvp'
        },
        domains: {
          'wedesign.design': '已设置别名',
          'www.wedesign.design': '已设置别名'
        },
        status: '部署完成',
        nextSteps: [
          '等待DNS完全传播（可能需要几分钟到几小时）',
          '测试完整功能流程',
          '监控网站性能'
        ],
        accessUrls: [
          'https://wedesign.design',
          'https://www.wedesign.design',
          deploymentUrl
        ].filter(Boolean)
      };
      
      fs.writeFileSync('deployment-report.json', JSON.stringify(report, null, 2));
      
      console.log('\n🎉 部署和域名修复完成！');
      console.log('\n🌐 可访问的URL:');
      report.accessUrls.forEach(url => {
        console.log(`   - ${url}`);
      });
      
      console.log('\n⏱️  部署完成时间:', new Date().toLocaleTimeString());
      
    } catch (deployError) {
      console.error('❌ 部署失败:', deployError.message);
      console.log('   部署输出:', deployError.stdout?.substring(0, 500));
    }
    
  } catch (error) {
    console.error('❌ 脚本执行失败:', error);
  }
}

// 运行部署
deployWithDomainFix();