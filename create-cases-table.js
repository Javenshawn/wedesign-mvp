const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1ZGNmamNtenllZnNpcm1zZXJnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDQ0NDc0NCwiZXhwIjoyMDU2MDIwNzQ0fQ.4vJYQzQkQvq6Qvq6Qvq6Qvq6Qvq6Qvq6Qvq6Qvq6Qvq6'

if (!supabaseUrl) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createCasesTable() {
  console.log('Creating cases table in Supabase...')
  
  const sql = `
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
  `

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql })
    
    if (error) {
      console.error('Error creating table via RPC:', error)
      
      // 尝试直接执行SQL
      console.log('Trying alternative method...')
      await insertSampleData()
    } else {
      console.log('Table created successfully via RPC')
      await insertSampleData()
    }
  } catch (error) {
    console.error('Failed to create table:', error)
    await insertSampleData()
  }
}

async function insertSampleData() {
  console.log('Inserting sample case data...')
  
  const sampleCases = [
    {
      client_name: 'TechStart Inc.',
      client_email: 'alex.johnson@techstart.com',
      company: 'TechStart Inc.',
      industry: 'SaaS / Technology',
      project_type: 'Complete Brand Identity Design',
      package: 'Premium',
      amount: 99900,
      timeline: '2-3 weeks',
      status: 'completed',
      description: 'Complete brand identity design for a technology startup specializing in SaaS solutions. The project included logo design, color palette, typography system, and full brand guidelines.',
      design_style: 'Modern, Clean, Professional',
      color_palette: 'Blue tones, Gradient effects, White space',
      deliverables: ['Logo Design', 'Color Palette', 'Typography System', 'Brand Guidelines', 'Social Media Kit', 'Business Cards', 'Email Signature', 'Presentation Template'],
      testimonial: 'The Wedesign team delivered exceptional work that perfectly captured our brand vision. The process was smooth and the final result exceeded our expectations. Highly recommended!',
      rating: 5,
      reference_image: '微信图片_20201028145905.jpg',
      order_id: 'cs_test_' + Math.floor(Math.random() * 1000000),
      is_featured: true,
      tags: ['branding', 'logo-design', 'saas', 'technology', 'premium']
    },
    {
      client_name: 'GreenLeaf Organics',
      client_email: 'sarah@greenleaforganics.com',
      company: 'GreenLeaf Organics',
      industry: 'Health & Wellness',
      project_type: 'Logo & Packaging Design',
      package: 'Professional',
      amount: 59900,
      timeline: '1-2 weeks',
      status: 'completed',
      description: 'Logo design and packaging system for an organic health food company. Focus on natural, earthy aesthetics that communicate purity and quality.',
      design_style: 'Organic, Natural, Minimalist',
      color_palette: 'Green tones, Earth colors, Natural textures',
      deliverables: ['Logo Design', 'Packaging Design', 'Label System', 'Brand Colors'],
      testimonial: 'The design perfectly represents our commitment to natural, organic products. Sales increased by 30% after rebranding!',
      rating: 5,
      is_featured: true,
      tags: ['packaging', 'organic', 'health', 'food', 'professional']
    },
    {
      client_name: 'FinTech Solutions',
      client_email: 'michael@fintechsolutions.io',
      company: 'FinTech Solutions',
      industry: 'Finance / FinTech',
      project_type: 'Corporate Identity',
      package: 'Basic',
      amount: 29900,
      timeline: '3-5 days',
      status: 'completed',
      description: 'Corporate identity design for a financial technology startup. Clean, trustworthy design that communicates security and innovation.',
      design_style: 'Corporate, Trustworthy, Innovative',
      color_palette: 'Blue, Gray, White, Accent colors',
      deliverables: ['Logo Design', 'Business Cards', 'Email Signature', 'Document Template'],
      testimonial: 'Fast delivery and professional results. Exactly what we needed for our investor pitch.',
      rating: 4,
      is_featured: false,
      tags: ['corporate', 'fintech', 'finance', 'basic']
    }
  ]

  try {
    for (const caseData of sampleCases) {
      const { data, error } = await supabase
        .from('cases')
        .insert(caseData)
        .select()
      
      if (error) {
        console.error(`Error inserting case ${caseData.company}:`, error.message)
        // 表可能不存在，继续尝试下一个
        continue
      }
      
      console.log(`✓ Inserted case: ${caseData.company}`)
    }
    
    console.log('Sample data insertion completed')
  } catch (error) {
    console.error('Failed to insert sample data:', error.message)
  }
}

async function checkExistingTables() {
  console.log('Checking existing tables...')
  
  try {
    // 尝试查询cases表
    const { data, error } = await supabase
      .from('cases')
      .select('count')
      .limit(1)
    
    if (error) {
      console.log('Cases table does not exist, will create it')
      return false
    }
    
    console.log('Cases table already exists')
    return true
  } catch (error) {
    console.log('Cases table does not exist:', error.message)
    return false
  }
}

async function main() {
  console.log('=== Supabase Cases Table Setup ===')
  console.log('Supabase URL:', supabaseUrl)
  
  const tableExists = await checkExistingTables()
  
  if (!tableExists) {
    await createCasesTable()
  } else {
    console.log('Cases table already exists, skipping creation')
    await insertSampleData()
  }
  
  console.log('=== Setup Complete ===')
}

main().catch(console.error)