// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'firebasestorage.googleapis.com',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;

// Import the bundle analyzer package
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
};

// Export the combined configuration
export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);


