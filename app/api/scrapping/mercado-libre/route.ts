import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { APP_ENV, DIR_IMAGES, MERCADO_LIBRE, TOKEN_BROWSERLESS } from "@/lib/constants";
import fs from 'fs'
import path from 'path'

/**
 * Scrapping values from Amazon
 * return {cards} has contains
 * @returns {
 * title: string;
 * price: string;
 * src: string;
 * condition: string;
 * url: string;
 * }
 * when it has error 
 * * @returns {
* error: string;
* hasError: boolean;
* } 
 */

export async function POST(req: NextRequest) {
  try {
    const { searchInput } = await req.json()

    if (!searchInput) {
      return Response.json({ error: "No params provided", hasError: true })
    }

    const isProd = APP_ENV === 'production'
    const ROUTE = 'mercado-libre'
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

    // to monitors (only available)
    // await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1, isLandscape: true });

    // to mobiles is the same the input cb1-edit id
    // await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 1, isMobile: true });

    const timeoutAfterLoad = 7000
    await page.goto(MERCADO_LIBRE, { waitUntil: "domcontentloaded", timeout: timeoutAfterLoad });

    await page.type('#cb1-edit', searchInput);
    await page.keyboard.press("Enter");

    await page.waitForNavigation();

    // SAVE IMAGES
    // NO SOLUTION FOR NOW TO PRODUCCION ONLY IN LOCAL DEVELOPMENT
    if (isProd) {
      const url = `/var/task/.next/static/public/`
      await fs.promises.mkdir(url, { recursive: true });
      await fs.promises.mkdir(`${url}/${ROUTE}/`)
      const filePath = `${url}/${ROUTE}/${searchInput}.webp`;
      await page.screenshot({
        path: filePath,
        type: 'webp',
        // to save mb size to each image
        fullPage: false
      })

    } else {

      const rootUrl = process.cwd();
      const folderPath = `${rootUrl}${DIR_IMAGES}/${ROUTE}/`;
      const filePath = `${folderPath}${searchInput}.webp`;

      // check if exists the folder
      await fs.promises.mkdir(folderPath, { recursive: true });

      await page.screenshot({
        path: filePath,
        type: 'webp',
        // to save mb size to each image
        fullPage: false
      })
    }



    const cards = await page.$$eval(
      '.ui-search-results .ui-search-result__wrapper',
      (resultItems) => {
        return resultItems.map((resultItem) => {
          const title = resultItem.querySelector(
            '.ui-search-item__group h2'
          )?.textContent;
          const price = resultItem.querySelector(
            '.ui-search-item__group .andes-money-amount__fraction'
          )?.textContent;
          const condition = resultItem.querySelector(
            '.ui-search-item__group .ui-search-item__details'
          )?.textContent ?? '';


          const url = resultItem.querySelector('a')?.href;
          const src = resultItem.querySelector('.ui-search-result__image img')?.getAttribute("src")

          if (title && price && url) {
            return {
              title,
              price,
              src,
              condition,
              url,
            };
          }
          return {
            title: '',
            price: '',
            src: '',
            condition: '',
            url: '',
          }
        });
      },
    );
    const cleanData = cards.filter(val => val.title !== '')

    await page.close();
    if (!page.isClosed()) await page.close()

    await browser.disconnect()
    if (browser.connected) await browser.disconnect()

    return Response.json({ data: cleanData })
  } catch (error) {

    if (error instanceof Error) {

      const gistApiUrl = 'https://api.github.com/gists';
      const routeHandler = 'mercado-libre'
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
