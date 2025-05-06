/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enable static exports for GitHub Pages
  output: 'export',
  
  // Set basePath to repository name in production (for GitHub Pages)
  // Replace 'jabeza-website' with your actual repository name
  basePath: process.env.NODE_ENV === 'production' ? '/jabeza-website' : '',
  
  // Make basePath available to client components
  publicRuntimeConfig: {
    basePath: process.env.NODE_ENV === 'production' ? '/jabeza-website' : '',
  },
  
  // Disable server-based image optimization for GitHub Pages (static export)
  images: {
    unoptimized: true,
  },
  
  // Prevent Next.js from adding trailing slashes to URLs
  trailingSlash: false,
  
  // Configure image domains if needed
  // images: {
  //   domains: ['example.com'],
  // },
};

module.exports = nextConfig;