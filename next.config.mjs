/** @type {import('next').NextConfig} */
const nextConfig = {
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "styles")],
  // },
  experimental: {
    serverComponentsExternalPackages: [
      // "argon2",
    ],
  },
  images: {
    domains: [
      "japanoncloudnine.com",
      "instagram.fuio19-1.fna.fbcdn.net"
    
    ],
  },
};

export default nextConfig;
