import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { DIR_IMAGES, INSTAGRAM } from "@/lib/constants";
import fs from 'fs'
import path from 'path';
import getBrowser from "@/lib/get-browser";
/**
 * Scrapping values from Instagram
 * return {cards} has contains
 * @returns {
 * username: string;
 * src: string;
 * posts: string;
 * followers: string;
 * following: string;
 * }
 * when it has error 
 * * @returns {
* error: string;
* hasError: boolean;
* } 
* DOCS:
* https://nextjs.org/docs/app/building-your-application/routing/route-handlers
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

    // to mobiles is the same the input ?
    // await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 1, isMobile: true });

    // timeout to 7 seconds due to charge page
    const timeoutAfterLoad = 7000
    await page.goto(`${INSTAGRAM}/${searchInput}`, { waitUntil: "domcontentloaded", timeout: timeoutAfterLoad });
    await new Promise(resolve => setTimeout(resolve, timeoutAfterLoad));

    // place to save the image

    // any solution?? for now not
    // const rootUrl = process.cwd()
    // const path = `${rootUrl}${DIR_IMAGES}/instagram/${searchInput}.webp`
    // await page.screenshot({
    //   path,
    //   type: 'webp',
    //   fullPage: true
    // })

    const cards = await page.$$eval(
      'header',
      (resultItems) => {
        return resultItems.map((resultItem) => {
          const username = resultItem.querySelector(
            'section .x6s0dn4 h2'
          )?.textContent;

          const ulSelector = '.x78zum5.x1q0g3np.xieb3on';
          const list = document.querySelectorAll(`${ulSelector} li`)
          const itemsUsername = Array.from(list).map(li => {
            const item = li.querySelector('.html-span')?.textContent?.trim();
            return item;
          })

          const posts = itemsUsername[0] ?? ''
          const followers = itemsUsername[1] ?? ''
          const following = itemsUsername[2] ?? ''

          const src = resultItem.querySelector('.x78zum5 img')?.getAttribute("src")

          if (username && src) {
            return {
              username,
              src,
              posts,
              followers,
              following,
            };
          }
          return {
            username: '',
            src: '',
            posts: '',
            followers: '',
            following: '',
          }
        });
      },
    );

    const cleanData = cards.filter(val => val.username !== '')

    await page.close();
    if (!page.isClosed()) await page.close()

    await browser.disconnect()
    // if (browser.connected) await browser.disconnect()

    return Response.json({ data: cleanData ?? [] })
  } catch (error) {

    if (error instanceof Error) {

      const gistApiUrl = 'https://api.github.com/gists';
      const routeHandler = 'instagram'
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
