/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

export default nextConfig;
