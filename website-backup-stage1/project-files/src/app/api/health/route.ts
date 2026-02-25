import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'healthy',
    services: {
      website: true,
      database: process.env.NEXT_PUBLIC_SUPABASE_URL ? true : false,
      stripe: process.env.STRIPE_SECRET_KEY ? true : false,
      deployment: process.env.VERCEL ? true : false
    },
    version: '1.0.0',
    uptime: process.uptime()
  };

  return NextResponse.json(checks, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

export const dynamic = 'force-dynamic';