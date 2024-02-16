/**
 *  @type {import('next').NextConfig}
 *  @const knownDomains are image providers but certainly are like example
 * */

const knownDomains = [
  "instagram.fuio19-1.fna.fbcdn.net",
  "m.media-amazon.com",
  "http2.mlstatic.com",
  "images.fastcompany.net",
  "1dh5zqw7u0xfdger.public.blob.vercel-storage.com",
  "scontent-lax3-1.cdninstagram.com",
  "scontent-ams2-1.cdninstagram.com",
  "instagram.fcpv15-1.fna.fbcdn.net",
  "instagram.fuio35-1.fna.fbcdn.net",
  "books.toscrape.com",
  "cloudflare-ipfs.com",
  "avatars.githubusercontent.com",
];

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: [
      // "argon2",
      "oslo",
      "puppeteer-core",
      "@sparticuz/chromium-min",
    ],
  },
  webpack: (config) => {
    config.externals.push(
      "@node-rs/argon2",
      "@node-rs/bcrypt",
      "@sparticuz/chromium-min"
    );
    return config;
  },
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "scontent-lax3-1.cdninstagram.com",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "instagram.fuio19-1.fna.fbcdn.net",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "m.media-amazon.com",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "http2.mlstatic.com",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "images.fastcompany.net",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "1dh5zqw7u0xfdger.public.blob.vercel-storage.com",
    //     pathname: "/**",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "scontent-lax3-1.cdninstagram.com",
    //     pathname: "/**",
    //   },
    // ],
    domains: knownDomains,
  },
};

export default nextConfig;
