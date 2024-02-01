/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      // "argon2",
    ],
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
