import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      // Add your production Strapi domain here when deployed
      // {
      //   protocol: 'https',
      //   hostname: 'your-strapi-domain.com',
      // },
    ],
  },
  // Disable image optimization for Vercel if on free tier
  // images: {
  //   unoptimized: true,
  // },
};

export default nextConfig;
