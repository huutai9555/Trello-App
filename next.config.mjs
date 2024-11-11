/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thuviensach.vn",
        port: "",
        pathname: "/img/audio/comic/Berserk/**",
      },
    ],
  },
};

export default nextConfig;
