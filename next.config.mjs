/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 300,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', 
        destination: 'http://45.79.198.164:3004/api/:path*', 
      },
    ];
  },
};

export default nextConfig;
