/** @type {import('next').NextConfig} */
const nextConfig = {}

// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "https://did-portkey-test.portkey.finance/api/:path*",
        },
        {
          source: "/graphql/:path*",
          destination: "https://dapp-portkey-test.portkey.finance/Portkey_DID/PortKeyIndexerCASchema/graphql/:path*",
        },
      ];
    },
  };
  
  
