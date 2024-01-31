/** @type {import('next').NextConfig} */
const nextConfig = {
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "styles")],
  // },
  experimental: {
    serverComponentsExternalPackages: [
      // "puppeteer-extra",
      // "puppeteer-extra-plugin-stealth",
      // "puppeteer-extra-plugin-recaptcha",
      // "puppeteer-extra-plugin-adblocker",
      // "puppeteer-extra-plugin-anonymize-ua",
      // "puppeteer-core",
      // "argon2",
    ],
  },
};

export default nextConfig;
