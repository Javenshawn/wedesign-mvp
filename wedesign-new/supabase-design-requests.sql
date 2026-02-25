-- 设计需求表
CREATE TABLE IF NOT EXISTS design_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  project_type TEXT NOT NULL,
  budget TEXT NOT NULL,
  timeline TEXT NOT NULL,
  description TEXT NOT NULL,
  reference_files TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'accepted', 'rejected', 'completed')),
  assigned_to TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_design_requests_status ON design_requests(status);
CREATE INDEX idx_design_requests_created_at ON design_requests(created_at DESC);
CREATE INDEX idx_design_requests_email ON design_requests(email);

-- 创建存储桶用于上传文件
-- 在Supabase控制台中执行：
-- 1. 进入Storage
-- 2. 创建新存储桶: design-requests
-- 3. 设置权限为公开读取（如果需要）

-- 或者通过SQL创建策略：
-- CREATE POLICY "允许上传设计需求文件"
-- ON storage.objects FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'design-requests');

-- CREATE POLICY "允许读取设计需求文件"
-- ON storage.objects FOR SELECT
-- TO authenticated
-- USING (bucket_id = 'design-requests');

-- 启用行级安全
ALTER TABLE design_requests ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人插入新请求
CREATE POLICY "允许插入设计需求"
ON design_requests FOR INSERT
TO anon
WITH CHECK (true);

-- 创建策略：允许认证用户查看所有请求
CREATE POLICY "允许查看设计需求"
ON design_requests FOR SELECT
TO authenticated
USING (true);

-- 创建策略：允许认证用户更新请求
CREATE POLICY "允许更新设计需求"
ON design_requests FOR UPDATE
TO authenticated
USING (true);

-- 更新时间戳触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_design_requests_updated_at
  BEFORE UPDATE ON design_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 插入示例数据（可选）
INSERT INTO design_requests (name, email, phone, company, project_type, budget, timeline, description, status)
VALUES 
  ('张三', 'zhangsan@example.com', '+86 138 0013 8000', '科技创业公司', '品牌标识设计', '$599 - 专业套餐', '1-2周（标准）', '我们需要一个现代、专业的品牌标识，面向科技创业者。', 'contacted'),
  ('李四', 'lisi@company.com', '+86 139 0024 9000', '电商品牌', '产品包装设计', '$999 - 高级套餐', '3-7天（加急）', '需要为新产品设计包装，要求环保材料，突出品牌特色。', 'quoted'),
  ('王五', 'wangwu@startup.com', '+86 137 0035 7000', '初创企业', '网站UI/UX设计', '$299 - 基础套餐', '2-4周（复杂项目）', '需要设计一个企业官网，展示产品和服务，要求响应式设计。', 'new');