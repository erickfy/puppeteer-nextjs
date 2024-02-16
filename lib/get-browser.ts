// import chromium from '@sparticuz/chromium-min';
import chromium from '@sparticuz/chromium';

import puppeteer from 'puppeteer-core';

/**
 * DOCS: 
 * ? https://developer.chrome.com/docs/chromium/new-headless instead of true --> 'new'
 * https://www.npmjs.com/package/@sparticuz/chromium-min
 * ARGS:
 * https://peter.sh/experiments/chromium-command-line-switches/
 * 
 * 
 */
export default async function getBrowser() {
    const isProd = process.env.APP_ENV as string === 'production'

    if (isProd) {
        const browser = puppeteer.launch({
            args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
            defaultViewport: chromium.defaultViewport,
            // executablePath: await chromium.executablePath(
            //     "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
            // ),
            executablePath: await chromium.executablePath(),
            headless: true,
            ignoreHTTPSErrors: true,
        });

        return browser

    } else {
        return puppeteer.launch({
            args: ['--hide-scrollbars', '--disable-web-security'],
            // defaultViewport: 
            executablePath: '/home/zukyo/Desktop/erick/testing/johan/retesis2024/.cache/puppeteer/chrome/linux-121.0.6167.85/chrome-linux64/chrome',
            ignoreHTTPSErrors: true,
            headless: false
        });

    }

}