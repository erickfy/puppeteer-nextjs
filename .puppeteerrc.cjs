const { join } = require("path");

/**
 * @type {import("puppeteer").Configuration}
*/

const PROXY = process.env.PROXY_AND_PORT;

module.exports = {
  // cacheDirectory: join(process.cwd(), ".cache", "puppeteer"),
  env: {
    HTTP_PROXY: `http://${PROXY}`,
    HTTPS_PROXY: `https://${PROXY}`,
    NO_PROXY: "localhost,127.0.0.1",
  },
};
