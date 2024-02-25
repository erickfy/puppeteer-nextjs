import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { APP_ENV, BOT_DETECT_ADDRESS, DIR_IMAGES, TOKEN_BROWSERLESS, TWITHOUT_INPUT } from "@/lib/constants";
import sharp from 'sharp';
import fs from 'fs'

/**
 * API to detect robots 
 * @returns {
 * data: [Buffer]
 * }
 * when it has error 
 * @returns {
 * error: string;
 * hasError: boolean;
 * } 
 */
export async function POST(req: NextRequest) {
  try {

    const captureBuffer = await captureScreenshot();

    const processedBuffer = await sharp(captureBuffer).webp().toBuffer();

    return Response.json({ data: [processedBuffer] });
  } catch (error) {

    if (error instanceof Error) {

      const gistApiUrl = 'https://api.github.com/gists';
      const routeHandler = 'bot-detect'
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


      const response = await fetch(gistApiUrl, {
        method: 'POST',
        body: JSON.stringify(gistData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const responseData = await response.json();

      if (response.ok) {

        return Response.json({
          error: 'Archivo de error enviado a GitHub Gist',
          hasError: true,
          urlError: responseData.html_url,
          data: []
        });
      } else {

        return Response.json({
          error: `Error al enviar el archivo a GitHub Gist \n ${responseData.message}`,
          hasError: true,
          data: []
        },
          { status: response.status }
        );
      }

    }

    return Response.json({
      error: "Error desconocido",
      hasError: true,
      data: []
    })
  }
}


async function captureScreenshot() {
  const isProd = APP_ENV === 'production'
  const ROUTE = 'bot-detect'
  let browser;

  if (isProd) {

    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${TOKEN_BROWSERLESS}`,
    })

  } else {

    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        // Use proxy for localhost URLs
        '--proxy-bypass-list=<-loopback>',
      ],
      headless: 'new'
    });
  }


  const page = await browser.newPage();

  await page.goto(BOT_DETECT_ADDRESS, { waitUntil: 'domcontentloaded' });

  // SAVE IMAGES
  // NO SOLUTION FOR NOW TO PRODUCCION ONLY IN LOCAL DEVELOPMENT

  let capture;
  if (isProd) {
    const url = `/var/task/.next/static/public/`
    await fs.promises.mkdir(url, { recursive: true });
    await fs.promises.mkdir(`${url}/${ROUTE}/`)
    const filePath = `${url}/${ROUTE}/${TWITHOUT_INPUT.BOT_DETECT as string}`;
    capture = await page.screenshot({
      path: filePath,
      type: 'webp',
      // to save mb size to each image
      fullPage: false
    })

  } else {

    const rootUrl = process.cwd();
    const folderPath = `${rootUrl}${DIR_IMAGES}/${ROUTE}/`;
    const filePath = `${folderPath}${TWITHOUT_INPUT.BOT_DETECT as string}`;

    // check if exists the folder
    await fs.promises.mkdir(folderPath, { recursive: true });

    capture = await page.screenshot({
      path: filePath,
      type: 'webp',
      // to save mb size to each image
      fullPage: false
    })
  }


  await page.close();
  if (!page.isClosed()) await page.close()

  await browser.disconnect()
  // if (browser.connected) await browser.disconnect()

  return capture;
}