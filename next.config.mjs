/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  // experimental: {
  //   serverComponentsExternalPackages: ["mongoose"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fonts.gstatic.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
