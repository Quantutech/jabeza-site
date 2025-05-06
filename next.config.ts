/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enable static exports for GitHub Pages
  output: 'export',
  
  // Set basePath to repository name in production (for GitHub Pages)
  basePath: process.env.NODE_ENV === 'production' ? '/jabeza-site' : '',
  
  // Disable server-based image optimization for GitHub Pages (static export)
  images: {
    unoptimized: true,
  },
  
  // Prevent Next.js from adding trailing slashes to URLs
  trailingSlash: false,
  
  // ESLint config to prevent build failures on warnings
  eslint: {
    // Only run ESLint on these directories during production builds
    dirs: ['pages', 'components', 'lib', 'utils', 'styles'],
    // Don't stop the build if there are errors
    ignoreDuringBuilds: true,
  },
  
  // Type checking
  typescript: {
    // Don't fail the build on type errors
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig;