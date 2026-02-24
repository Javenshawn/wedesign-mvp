/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'wedesign.design', 'wedesign-*.vercel.app'],
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
}

module.exports = nextConfig