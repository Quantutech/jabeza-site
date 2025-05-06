/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === 'production' ? '/jabeza-site' : '',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
