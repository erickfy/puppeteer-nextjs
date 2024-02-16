import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

/**
 * DOCS: 
 * ? https://developer.chrome.com/docs/chromium/new-headless instead of true --> 'new'
 * 
 */
export default async function getBrowser() {
    const isProd = process.env.APP_ENV as string === 'production'

    if (isProd) {
        return puppeteer.launch({
            args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(
                'https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar'
            ),
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

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