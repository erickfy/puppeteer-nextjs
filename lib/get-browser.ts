import chromiumMin from '@sparticuz/chromium-min';
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
    try {

        const isProd = process.env.APP_ENV as string === 'production'

        if (isProd) {
            chromium.setGraphicsMode = false

            // mod min - chrome 
            const browser = await puppeteer.launch({
                args: chromiumMin.args,
                defaultViewport: chromiumMin.defaultViewport,
                executablePath: await chromiumMin.executablePath(
                    "https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar"
                ),
                headless: chromiumMin.headless,
                ignoreHTTPSErrors: true,
            });
            return browser

        } else {
            const browser = puppeteer.launch({
                args: ['--hide-scrollbars', '--disable-web-security'],
                // defaultViewport: 
                executablePath: '/home/zukyo/Desktop/erick/testing/johan/retesis2024/.cache/puppeteer/chrome/linux-121.0.6167.85/chrome-linux64/chrome',
                ignoreHTTPSErrors: true,
                headless: chromium.headless
            });
            return browser

        }

    } catch (error) {

        if (error instanceof Error) {

            const gistApiUrl = 'https://api.github.com/gists';
            const routeHandler = 'browser'
            const nameFile = `error-${routeHandler}-${(new Date()).toISOString()}.txt`
            const accessToken = process.env.GIST as string ?? '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';

            const gistData = {
                public: true,
                files: {
                    [nameFile]: {
                        content: `Stack error: \n
                Name: ${JSON.stringify(error.name)}
                Cause: ${JSON.stringify(error.cause)}
                Message: ${JSON.stringify(error.message)}
                Stack: ${JSON.stringify(error.stack)}
                `,
                    },
                },
            };


            await fetch(gistApiUrl, {
                method: 'POST',
                body: JSON.stringify(gistData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

        }


    }
    const browsering = puppeteer.launch({
        // args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        // executablePath: await chromium.executablePath(
        //     "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
        // ),
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });

    return browsering

}