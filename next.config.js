/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental.appDir removed; app directory is enabled by default in Next.js 13+
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig