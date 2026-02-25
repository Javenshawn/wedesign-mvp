/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'wedesign.design', 'www.wedesign.design', 'wedesign-*.vercel.app'],
    unoptimized: true, // 简化图片优化
  },
  // 强制HTTPS
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';"
          }
        ],
      },
    ]
  },
  // 环境变量
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wedesign.design',
  },
  // 重定向配置
  async redirects() {
    return [
      // 从非www重定向到www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'wedesign.design',
          },
        ],
        destination: 'https://www.wedesign.design/:path*',
        permanent: true,
      },
      // 确保HTTPS
      {
        source: '/:path*',
        missing: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'https',
          },
        ],
        destination: 'https://www.wedesign.design/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig