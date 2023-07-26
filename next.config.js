/** @type {import('next').NextConfig} */

const nextConfig = {}
// module.exports = nextConfig
module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.node$/,
        use: 'raw-loader',
      });
      return config;
    },
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "firebasestorage.googleapis.com",
          port: "",
          pathname: "/v0/b/smart-uni-8.appspot.com/o/**",
        },
      ],
    },
  };
  
  