// 测试修复后的订单API
const https = require('https');

console.log('📝 测试修复后的订单API...');
console.log('============================\n');

const testData = {
  // 项目信息
  projectName: 'Test Brand Logo Design',
  projectDescription: 'Need a modern logo for our tech startup',
  projectType: 'logo-design',
  deadline: 'Within 2 weeks',
  
  // 品牌信息
  companyName: 'TechStart Inc.',
  industry: 'Technology',
  targetAudience: 'Young professionals, age 25-40, tech-savvy',
  competitors: 'Apple, Google, Microsoft',
  
  // 设计偏好
  designStyle: 'Modern Minimalist',
  colorPreferences: 'Blue tones, clean and professional',
  inspirationLinks: 'https://dribbble.com/tags/tech_logo',
  
  // 联系信息
  contactName: 'Alex Johnson',
  email: 'alex.johnson@techstart.com',
  phone: '+1-555-0123',
  wechat: 'alex_johnson',
  
  // 订单信息
  selectedPlan: 'basic',
  amount: 29900,
  status: 'pending'
};

const options = {
  hostname: 'wedesign.design',
  port: 443,
  path: '/api/orders',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Order-API-Test/1.0'
  },
  timeout: 10000
};

console.log('📤 发送测试订单数据:');
console.log(`   端点: https://wedesign.design/api/orders`);
console.log(`   项目: ${testData.projectName}`);
console.log(`   套餐: ${testData.selectedPlan}`);
console.log(`   联系人: ${testData.contactName}`);
console.log(`   邮箱: ${testData.email}`);
console.log('');

const req = https.request(options, (res) => {
  console.log(`📥 响应状态: ${res.statusCode} ${res.statusMessage}`);
  console.log(`   响应头:`);
  Object.entries(res.headers).forEach(([key, value]) => {
    console.log(`     ${key}: ${value}`);
  });

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('\n📄 响应内容:');
    try {
      const jsonData = JSON.parse(data);
      console.log(JSON.stringify(jsonData, null, 2));
      
      if (res.statusCode === 200) {
        console.log('\n✅ 订单API测试成功!');
        console.log(`   订单ID: ${jsonData.order_id}`);
        console.log(`   消息: ${jsonData.message}`);
        console.log(`   数据库保存: ${jsonData.database_saved ? '✅' : '⚠️'}`);
      } else {
        console.log('\n❌ 订单API返回错误:');
        console.log(`   错误: ${jsonData.error || '未知错误'}`);
        if (jsonData.details) {
          console.log(`   详情: ${jsonData.details}`);
        }
      }
    } catch (e) {
      console.log('   无法解析JSON响应:');
      console.log(data.substring(0, 500));
    }
    
    console.log('\n🔍 诊断建议:');
    if (res.statusCode === 400) {
      console.log('   1. 检查必填字段: projectName, contactName, selectedPlan');
      console.log('   2. 检查字段名映射是否正确');
      console.log('   3. 检查API验证逻辑');
    } else if (res.statusCode === 500) {
      console.log('   1. 检查服务器端错误日志');
      console.log('   2. 检查Supabase连接');
      console.log('   3. 检查数据库表结构');
    }
  });
});

req.on('error', (error) => {
  console.log(`❌ 请求失败: ${error.message}`);
  console.log('\n🔍 诊断建议:');
  console.log('   1. 检查域名解析');
  console.log('   2. 检查SSL证书');
  console.log('   3. 检查网络连接');
});

req.on('timeout', () => {
  console.log('⏰ 请求超时');
  req.destroy();
});

req.write(JSON.stringify(testData));
req.end();