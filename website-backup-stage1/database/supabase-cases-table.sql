-- Create success cases table for Wedesign
CREATE TABLE IF NOT EXISTS cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Client Information
  client_name TEXT NOT NULL,
  client_email TEXT,
  company TEXT,
  industry TEXT,
  
  -- Project Details
  project_type TEXT NOT NULL,
  package TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'USD',
  timeline TEXT,
  status TEXT DEFAULT 'completed',
  
  -- Design Details
  description TEXT,
  design_style TEXT,
  color_palette TEXT,
  deliverables TEXT[],
  
  -- Testimonial & Review
  testimonial TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  
  -- Visual Assets
  before_image_url TEXT,
  after_image_url TEXT,
  reference_image TEXT,
  
  -- Order Reference
  order_id TEXT,
  stripe_session_id TEXT,
  
  -- Display Settings
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  tags TEXT[]
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_is_featured ON cases(is_featured);
CREATE INDEX IF NOT EXISTS idx_cases_industry ON cases(industry);

-- Enable Row Level Security
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to cases" 
ON cases FOR SELECT 
USING (true);

-- Create policy for authenticated insert/update
CREATE POLICY "Allow authenticated users to manage cases" 
ON cases FOR ALL 
USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_cases_updated_at 
  BEFORE UPDATE ON cases 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample case based on design image reference
INSERT INTO cases (
  client_name,
  client_email,
  company,
  industry,
  project_type,
  package,
  amount,
  timeline,
  status,
  description,
  design_style,
  color_palette,
  deliverables,
  testimonial,
  rating,
  reference_image,
  order_id,
  is_featured,
  tags
) VALUES (
  'TechStart Inc.',
  'alex.johnson@techstart.com',
  'TechStart Inc.',
  'SaaS / Technology',
  'Complete Brand Identity Design',
  'Premium',
  99900,
  '2-3 weeks',
  'completed',
  'Complete brand identity design for a technology startup specializing in SaaS solutions. The project included logo design, color palette, typography system, and full brand guidelines.',
  'Modern, Clean, Professional',
  'Blue tones, Gradient effects, White space',
  ARRAY['Logo Design', 'Color Palette', 'Typography System', 'Brand Guidelines', 'Social Media Kit', 'Business Cards', 'Email Signature', 'Presentation Template'],
  'The Wedesign team delivered exceptional work that perfectly captured our brand vision. The process was smooth and the final result exceeded our expectations. Highly recommended!',
  5,
  '微信图片_20201028145905.jpg',
  'cs_test_' || floor(random() * 1000000)::text,
  true,
  ARRAY['branding', 'logo-design', 'saas', 'technology', 'premium']
);

-- Insert more sample cases for demonstration
INSERT INTO cases (
  client_name,
  client_email,
  company,
  industry,
  project_type,
  package,
  amount,
  timeline,
  status,
  description,
  design_style,
  color_palette,
  deliverables,
  testimonial,
  rating,
  is_featured,
  tags
) VALUES 
(
  'GreenLeaf Organics',
  'sarah@greenleaforganics.com',
  'GreenLeaf Organics',
  'Health & Wellness',
  'Logo & Packaging Design',
  'Professional',
  59900,
  '1-2 weeks',
  'completed',
  'Logo design and packaging system for an organic health food company. Focus on natural, earthy aesthetics that communicate purity and quality.',
  'Organic, Natural, Minimalist',
  'Green tones, Earth colors, Natural textures',
  ARRAY['Logo Design', 'Packaging Design', 'Label System', 'Brand Colors'],
  'The design perfectly represents our commitment to natural, organic products. Sales increased by 30% after rebranding!',
  5,
  true,
  ARRAY['packaging', 'organic', 'health', 'food', 'professional']
),
(
  'FinTech Solutions',
  'michael@fintechsolutions.io',
  'FinTech Solutions',
  'Finance / FinTech',
  'Corporate Identity',
  'Basic',
  29900,
  '3-5 days',
  'completed',
  'Corporate identity design for a financial technology startup. Clean, trustworthy design that communicates security and innovation.',
  'Corporate, Trustworthy, Innovative',
  'Blue, Gray, White, Accent colors',
  ARRAY['Logo Design', 'Business Cards', 'Email Signature', 'Document Template'],
  'Fast delivery and professional results. Exactly what we needed for our investor pitch.',
  4,
  false,
  ARRAY['corporate', 'fintech', 'finance', 'basic']
);

-- Display created cases
SELECT 
  id,
  client_name,
  company,
  project_type,
  package,
  amount/100.0 as amount_usd,
  status,
  created_at
FROM cases 
ORDER BY created_at DESC;