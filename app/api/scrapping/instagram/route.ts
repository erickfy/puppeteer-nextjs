import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { DIR_IMAGES, INSTAGRAM } from "@/lib/constants";
import fs from 'fs'
import path from 'path';
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

    const browser = await puppeteer.launch({
      args: ['--no-sandbox',],
      executablePath: '/',

      //? https://developer.chrome.com/docs/chromium/new-headless instead of true --> 'new'
      headless: 'new',
      // headless: false,
    });

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
    await page.screenshot({
      path: `${DIR_IMAGES}/instagram/${searchInput}.webp`,
      type: 'webp',
      fullPage: true
    })

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

    await browser.close();

    return Response.json({ data: cleanData ?? [] })
  } catch (error: unknown) {

    console.log(error)

    if (error instanceof Error) {
      // const logFilePath = path.join(__dirname, 'error.log');
      // fs.writeFileSync(logFilePath, error.stack || error.toString(), 'utf-8');
      
      
      
      const fileContent = 'This is a content test for scrapping well this is everything';
      
      // Configuración para la creación del Gist
      const gistApiUrl = 'https://api.github.com/gists';
      const gistData = {
        public: true,
        files: {
          'archivo.txt': { // Nombre del archivo en el Gist
            content: `Type: ${typeof error}\nDetails: ${JSON.stringify(error, null, 2)} 
            AND CAUSE: ${JSON.stringify(error.cause)}
            AND MESSAGE: ${JSON.stringify(error.message)}
            AND NAME: ${JSON.stringify(error.name)}
            AND STACK: ${JSON.stringify(error.stack)}
            `,
        },
      },
    };

    // Reemplaza 'tu_token_de_acceso' con tu token de acceso personal
    const accessToken = process.env.GIST as string ?? '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';

    const response = await fetch(gistApiUrl, {
      method: 'POST',
      body: JSON.stringify(gistData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const responseData = await response.json();

    // Verifica si la creación del Gist fue exitosa
    if (response.ok) {
      return Response.json({ data: 'Archivo enviado a GitHub Gist', gistUrl: responseData.html_url, hasError: true });
    } else {
      console.error('Error al enviar el archivo a GitHub Gist:', responseData.message);
      return Response.json({ error: 'Error al enviar el archivo a GitHub Gist', hasError: true }, { status: response.status }, );
    }
        
        
        
        


      return Response.json({ error: "error", hasError: true, url: responseData.html_url })

    }

    return Response.json({ error: "API Error see logs", hasError: true, data: [] })
  }
}
