import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 初始化Supabase客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // 提取表单数据
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const projectType = formData.get('projectType') as string;
    const budget = formData.get('budget') as string;
    const timeline = formData.get('timeline') as string;
    const description = formData.get('description') as string;
    
    // 处理文件上传（如果有）
    const files = formData.getAll('files') as File[];
    const fileUrls: string[] = [];
    
    if (files.length > 0) {
      for (const file of files) {
        const fileName = `${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('design-requests')
          .upload(fileName, file);
        
        if (!error && data) {
          const { data: urlData } = supabase.storage
            .from('design-requests')
            .getPublicUrl(fileName);
          
          if (urlData?.publicUrl) {
            fileUrls.push(urlData.publicUrl);
          }
        }
      }
    }
    
    // 保存到数据库
    const { data, error } = await supabase
      .from('design_requests')
      .insert([
        {
          name,
          email,
          phone,
          company,
          project_type: projectType,
          budget,
          timeline,
          description,
          reference_files: fileUrls,
          status: 'new',
          created_at: new Date().toISOString()
        }
      ])
      .select();
    
    if (error) {
      console.error('数据库保存错误:', error);
      return NextResponse.json(
        { error: '保存数据失败' },
        { status: 500 }
      );
    }
    
    // 发送通知邮件（这里可以集成邮件服务）
    // 暂时先记录到控制台
    console.log('新设计需求提交:', {
      name,
      email,
      phone,
      projectType,
      budget,
      timeline
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: '设计需求提交成功',
        requestId: data[0].id
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('表单处理错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: '设计需求API运行正常' },
    { status: 200 }
  );
}