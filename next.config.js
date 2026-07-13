/** @type {import('next').NextConfig} */
const nextConfig = {
  // R3F requires transpilation in Next.js 14
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Allow large 3D asset imports
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|hdr|exr)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
