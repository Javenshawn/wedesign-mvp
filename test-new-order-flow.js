// 测试新下单流程
console.log('🧪 测试新下单流程 - 多表格表单弹窗');
console.log('============================\n');

console.log('🎯 新流程特点:');
console.log('1. 点击套餐 → 弹出多表格表单');
console.log('2. 4个步骤: 项目信息 → 品牌信息 → 设计偏好 → 联系信息');
console.log('3. 邮箱非强制项');
console.log('4. 表单提交后跳转支付');
console.log('');

console.log('📋 测试步骤:');
console.log('1. 访问网站: https://wedesign-mvp.vercel.app');
console.log('2. 点击任意套餐按钮 (基础/专业/高级)');
console.log('3. 应该弹出多步骤表单弹窗');
console.log('4. 填写表单信息 (邮箱可选)');
console.log('5. 提交表单');
console.log('6. 跳转Stripe支付页面');
console.log('');

console.log('🔧 技术实现:');
console.log('✅ OrderFormModal组件 - 多步骤表单弹窗');
console.log('✅ /api/orders端点 - 保存订单信息');
console.log('✅ /api/checkout端点 - 处理支付 (支持元数据)');
console.log('✅ Supabase orders表 - 扩展字段存储详细信息');
console.log('');

console.log('📊 表单字段:');
console.log('步骤1 - 项目信息:');
console.log('  - 项目名称*');
console.log('  - 项目类型*');
console.log('  - 项目描述*');
console.log('  - 期望完成时间');
console.log('');

console.log('步骤2 - 品牌信息:');
console.log('  - 公司/品牌名称');
console.log('  - 行业领域');
console.log('  - 目标受众');
console.log('  - 竞争对手/参考品牌');
console.log('');

console.log('步骤3 - 设计偏好:');
console.log('  - 设计风格 (单选)');
console.log('  - 色彩偏好');
console.log('  - 灵感链接/参考图片');
console.log('');

console.log('步骤4 - 联系信息:');
console.log('  - 联系人姓名*');
console.log('  - 邮箱地址 (可选)');
console.log('  - 手机号码 (可选)');
console.log('  - 微信/WhatsApp (可选)');
console.log('');

console.log('🚀 立即测试:');
console.log('1. 等待部署完成 (约1-2分钟)');
console.log('2. 访问: https://wedesign-mvp.vercel.app');
console.log('3. 点击 "选择专业套餐 - $599"');
console.log('4. 验证表单弹窗正常显示');
console.log('5. 测试完整流程');
console.log('');

console.log('⏱️  部署状态: 进行中...');
console.log('请稍后访问网站测试新功能！');