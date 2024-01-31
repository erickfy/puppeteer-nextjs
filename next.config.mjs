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
    domains: ["japanoncloudnine.com"],
  },
};

export default nextConfig;
