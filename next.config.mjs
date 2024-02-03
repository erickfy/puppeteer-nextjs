/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      // "argon2",
      "oslo",
    ],
  },
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    domains: [
      "japanoncloudnine.com",
      "instagram.fuio19-1.fna.fbcdn.net",
      "m.media-amazon.com",
      "http2.mlstatic.com",
      "images.fastcompany.net",
    ],
  },
};

export default nextConfig;
