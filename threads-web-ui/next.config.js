/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "scontent.cdninstagram.com",
      },
    ],
  },
};

module.exports = nextConfig;
