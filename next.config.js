/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  basePath: '',
  env: {
    IsQAS: process.env.NODE_ENV === 'production' ? true : true,
    PublicSite: process.env.NODE_ENV === 'production' ? "https://subscription-website-cyruslung.vercel.app/" : "https://subscription-website-cyruslung.vercel.app/",
    SecureSite: process.env.NODE_ENV === 'production' ? "https://secure.demo.com" : "https://secure.demo.com",
    ApiUrl: process.env.NODE_ENV === 'production' ? "https://my-json-server.typicode.com/cyruslung/demo-api/sub/" : "https://my-json-server.typicode.com/cyruslung/demo-api/sub/",
    ShowDebug: process.env.NODE_ENV === 'production' ? false : true,
  },
  eslint: {
    ignoreDuringBuilds: true, // 忽略 ESLint 錯誤
  },
  typescript: {
    ignoreBuildErrors: true, // 忽略 TypeScript 錯誤
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/precisionX1', // https://subscription-website-cyruslung.vercel.app/
        permanent: false,
        basePath: false
      },
    ]
  }
}

module.exports = nextConfig