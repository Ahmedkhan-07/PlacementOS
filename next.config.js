/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium', 'pdf-parse'],
  },
};

module.exports = nextConfig;
