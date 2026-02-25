/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'wedesign.design', 'www.wedesign.design', 'wedesign-*.vercel.app'],
    unoptimized: true,
  },
  // 暂时禁用所有重定向
  async redirects() {
    return []
  },
  // 简化headers
  async headers() {
    return []
  },
  // 环境变量
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://wedesign.design',
  },
}

module.exports = nextConfig