// 检查Supabase连接
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'wedesign-mvp/.env.local' });

console.log('🔗 检查Supabase连接...');
console.log('============================\n');

async function checkSupabase() {
  try {
    // 从环境变量读取配置
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log('📋 配置检查:');
    console.log(`   Supabase URL: ${supabaseUrl ? '✅ 已配置' : '❌ 未配置'}`);
    console.log(`   Anon Key: ${supabaseAnonKey ? '✅ 已配置' : '❌ 未配置'}`);
    console.log(`   Service Key: ${supabaseServiceKey ? '✅ 已配置' : '❌ 未配置'}`);

    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('\n❌ 缺少必要的Supabase配置');
      return;
    }

    // 创建客户端
    const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);
    console.log('\n🔌 连接测试...');

    // 测试连接 - 尝试获取数据库信息
    const { data: tables, error: tablesError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public')
      .limit(5);

    if (tablesError) {
      console.log(`   ❌ 连接失败: ${tablesError.message}`);
      
      // 尝试更简单的查询
      console.log('   尝试简单查询...');
      const { data: simpleData, error: simpleError } = await supabase
        .rpc('version');

      if (simpleError) {
        console.log(`   ❌ 简单查询也失败: ${simpleError.message}`);
      } else {
        console.log(`   ✅ 连接成功! 数据库版本: ${simpleData}`);
      }
    } else {
      console.log(`   ✅ 连接成功! 发现 ${tables.length} 个表`);
      if (tables.length > 0) {
        console.log('   表列表:');
        tables.forEach(table => {
          console.log(`     - ${table.tablename}`);
        });
      }
    }

    // 检查orders表是否存在
    console.log('\n📊 检查orders表...');
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(1);

    if (ordersError) {
      console.log(`   ❌ orders表查询失败: ${ordersError.message}`);
      console.log('   可能原因:');
      console.log('     1. orders表不存在');
      console.log('     2. 表名不正确');
      console.log('     3. 权限不足');
      
      // 检查表是否存在
      const { data: tableExists } = await supabase
        .from('pg_tables')
        .select('tablename')
        .eq('schemaname', 'public')
        .eq('tablename', 'orders')
        .single();

      if (tableExists) {
        console.log('   ℹ️  orders表存在，但查询失败');
      } else {
        console.log('   ℹ️  orders表不存在，需要创建');
      }
    } else {
      console.log(`   ✅ orders表存在，包含 ${ordersData.length} 条记录`);
      if (ordersData.length > 0) {
        console.log('   示例订单:');
        const order = ordersData[0];
        console.log(`     ID: ${order.id}`);
        console.log(`     项目: ${order.project_name}`);
        console.log(`     状态: ${order.status}`);
        console.log(`     创建时间: ${order.created_at}`);
      }
    }

    // 测试插入操作
    console.log('\n📝 测试插入操作...');
    const testOrder = {
      project_name: 'Test Connection Order',
      contact_name: 'Test User',
      selected_plan: 'basic',
      status: 'test',
      created_at: new Date().toISOString()
    };

    const { data: insertData, error: insertError } = await supabase
      .from('orders')
      .insert([testOrder])
      .select();

    if (insertError) {
      console.log(`   ❌ 插入失败: ${insertError.message}`);
      console.log('   可能原因:');
      console.log('     1. 表结构不匹配');
      console.log('     2. 缺少必填字段');
      console.log('     3. 权限不足');
    } else {
      console.log(`   ✅ 插入成功! 订单ID: ${insertData[0].id}`);
      
      // 清理测试数据
      const { error: deleteError } = await supabase
        .from('orders')
        .delete()
        .eq('id', insertData[0].id);

      if (deleteError) {
        console.log(`   ⚠️  清理测试数据失败: ${deleteError.message}`);
      } else {
        console.log('   ✅ 测试数据已清理');
      }
    }

    // 检查数据库权限
    console.log('\n🔐 检查权限...');
    const { data: roleInfo, error: roleError } = await supabase
      .rpc('current_user');

    if (roleError) {
      console.log(`   ⚠️  无法获取用户信息: ${roleError.message}`);
    } else {
      console.log(`   ℹ️  当前用户: ${roleInfo}`);
    }

  } catch (error) {
    console.log(`❌ 检查过程中出错: ${error.message}`);
    console.log('堆栈:', error.stack);
  }
}

checkSupabase();