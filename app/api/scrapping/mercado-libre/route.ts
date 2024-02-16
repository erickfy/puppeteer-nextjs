import puppeteer from "puppeteer";

import { NextRequest } from "next/server";
import { DIR_IMAGES, MERCADO_LIBRE } from "@/lib/constants";
import getBrowser from "@/lib/get-browser";

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

    const browser = await getBrowser()

    const page = await browser.newPage();

    // to monitors (only available)
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1, isLandscape: true });

    // to mobiles is the same the input cb1-edit id
    // await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 1, isMobile: true });

    await page.goto(MERCADO_LIBRE, { waitUntil: "load" });

    await page.type('#cb1-edit', searchInput);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();

    // place to save the image
    await page.screenshot({
      path: `${DIR_IMAGES}/mercado-libre/${searchInput}.webp`,
      type: 'webp',
      fullPage: true
    })

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
