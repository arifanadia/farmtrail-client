/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.ibb.co.com'], 
      },
      // eslint: {
      //   ignoreDuringBuilds: true,
      // },
      typescript: {
        ignoreDuringBuilds: true,
      },
      
};

export default nextConfig;