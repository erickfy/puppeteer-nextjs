import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { BOT_DETECT_ADDRESS, DIR_IMAGES, TWITHOUT_INPUT } from "@/lib/constants";
import sharp from 'sharp';
import getBrowser from "@/lib/get-browser";


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

    console.log('well', captureBuffer.length)

    const processedBuffer = await sharp(captureBuffer).webp().toBuffer();

    console.log('already')
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
  // const browser = await puppeteer.launch({
  //   args: ['--no-sandbox'],
  //   headless: 'new',
  // });

  const browser = await getBrowser()
  console.log('here')

  const page = await browser.newPage();
  console.log('another')

  await page.goto(BOT_DETECT_ADDRESS, { waitUntil: 'load' });

  console.log('alright')


  const capture = await page.screenshot({
    path: `${DIR_IMAGES}/bot-detect/${TWITHOUT_INPUT.BOT_DETECT}`,
    type: 'webp',
    fullPage: true,
  });

  console.log('final')

  console.log("Chromium:", await browser.version());

  await page.close();
  if (!page.isClosed()) await page.close()

  await browser.disconnect()
  if (browser.connected) await browser.disconnect()

  console.log('return 2')

  return capture;
}