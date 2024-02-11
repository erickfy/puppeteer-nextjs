import { defineConfig, devices } from "@playwright/test";
import path from "path";
import dotenv from 'dotenv';

/**
 * DOCS: 
 * https://playwright.dev/docs/test-parameterize#env-files
 * https://playwright.dev/docs/network#http-proxy
 */

dotenv.config();

const baseURL = `http://localhost:3000`;

console.log('baseURL: ', baseURL)

// const PROXY = process.env.PROXY_AND_PORT as string

// Reference: https://playwright.dev/docs/test-configuration
export default defineConfig({
  
  // Timeout per test
  timeout: 50 * 1000,
  // Test directory
  testDir: path.join(__dirname, "e2e", 'pages'),
  // If a test fails, retry it additional 2 times
  retries: 0,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: "./e2e/test-results/",

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: "bun run dev",
    url: baseURL,
    timeout: 50 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  globalSetup: require.resolve('./e2e/global-setup'),
  globalTeardown: require.resolve('./e2e/global-teardown'),

  use: {
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,
    launchOptions: {
      // Browser proxy option is required for Chromium on Windows.
      // Configuración del proxy sin autenticación
      // proxy: {
      //   server: PROXY,
      //   bypass: 'localhost'
      // },
      
    },
    // proxy: {
    //   server: PROXY,
    // },

    screenshot: 'only-on-failure',

    // Retry a test if its failing with enabled tracing. This allows you to analyze the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    // Record trace only when retrying a test for the first time.

    // trace: "retry-with-trace",
    trace: 'on-first-retry',

    // Record video only when retrying a test for the first time.
    // video: 'on-first-retry'

    
    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    // contextOptions: {
    //   // storageState: './e2e/setup/globalSetup.ts'
    //   ignoreHTTPSErrors: false,
    // },
  },

  projects: [
    // {
    //   name: "Desktop Chrome",
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     channel: 'chrome',
    //     headless: false
    //   },

    // },

    // {
    //   name: 'Desktop Firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    // {
    //   name: 'Desktop Safari',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
    // Test against mobile viewports.
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
        channel: 'chrome',
        headless: false
      },
    },
    // {
    //   name: "Mobile Safari",
    //   use: devices["iPhone 12"],
    // },
  ],
});
