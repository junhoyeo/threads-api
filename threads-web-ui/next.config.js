/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com, **.fbcdn.net',
      },
    ],
  },
};

module.exports = nextConfig;
