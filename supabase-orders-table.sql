-- 创建详细的orders表
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- 项目信息
  project_name TEXT NOT NULL,
  project_description TEXT,
  project_type TEXT,
  deadline TEXT,
  
  -- 品牌信息
  company_name TEXT,
  industry TEXT,
  target_audience TEXT,
  competitors TEXT,
  
  -- 设计偏好
  design_style TEXT,
  color_preferences TEXT,
  inspiration_links TEXT,
  
  -- 联系信息
  contact_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  wechat TEXT,
  
  -- 订单信息
  selected_plan TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending',
  
  -- Stripe支付信息
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  stripe_customer_id TEXT,
  
  -- 支付状态
  payment_status TEXT DEFAULT 'unpaid',
  paid_at TIMESTAMPTZ,
  
  -- 项目状态
  assigned_to TEXT,
  progress_status TEXT DEFAULT 'not_started',
  completed_at TIMESTAMPTZ,
  
  -- 元数据
  metadata JSONB DEFAULT '{}',
  
  -- 索引
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'in_progress', 'review', 'completed', 'cancelled')),
  CONSTRAINT valid_payment_status CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'failed')),
  CONSTRAINT valid_progress_status CHECK (progress_status IN ('not_started', 'research', 'design', 'review', 'revision', 'delivered'))
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_selected_plan ON orders(selected_plan);
CREATE INDEX IF NOT EXISTS idx_orders_contact_name ON orders(contact_name);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);

-- 启用行级安全
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 创建公开读取策略（仅限自己的订单）
CREATE POLICY "Users can view their own orders" 
ON orders FOR SELECT 
USING (true); -- 暂时允许所有人查看，生产环境需要认证

-- 创建插入策略
CREATE POLICY "Anyone can insert orders" 
ON orders FOR INSERT 
WITH CHECK (true);

-- 创建更新策略
CREATE POLICY "Admin can update orders" 
ON orders FOR UPDATE 
USING (true); -- 生产环境需要管理员权限

-- 创建触发器更新updated_at
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_orders_updated_at();

-- 插入示例订单
INSERT INTO orders (
  project_name,
  project_description,
  project_type,
  contact_name,
  email,
  selected_plan,
  amount,
  status,
  payment_status
) VALUES 
(
  'TechStart品牌Logo设计',
  '为科技初创公司设计现代化Logo，需要体现创新和技术感',
  'logo-design',
  'Alex Johnson',
  'alex@techstart.com',
  'premium',
  99900,
  'completed',
  'paid'
),
(
  'GreenLeaf有机食品包装',
  '为有机食品品牌设计环保、自然的包装方案',
  'packaging-design',
  'Sarah Chen',
  'sarah@greenleaf.com',
  'professional',
  59900,
  'in_progress',
  'paid'
),
(
  '金融科技网站UI设计',
  '为金融科技公司设计专业、可信的网站界面',
  'website-design',
  'Michael Wang',
  'michael@fintech.com',
  'basic',
  29900,
  'pending',
  'unpaid'
);

-- 查看创建的表
SELECT 
  id,
  project_name,
  contact_name,
  selected_plan,
  amount/100.0 as amount_usd,
  status,
  payment_status,
  created_at
FROM orders 
ORDER BY created_at DESC;