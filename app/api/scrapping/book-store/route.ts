// import puppeteer from "puppeteer-extra";
import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { APP_ENV, BOOKS_ADDRESS, DIR_IMAGES, TOKEN_BROWSERLESS, TWITHOUT_INPUT } from "@/lib/constants";
import fs from 'fs'

/**
 * Scrapping values from Books to scrape
 * return {cards} has contains
 * @returns {
 * title: string;
 * price: string;
 * url: string;
 * stock: string;
 * src: string;
 * review:string;
 * }
 * when it has error 
 * * @returns {
* error: string;
* hasError: boolean;
* } 
 */
type OUT = {
  title: string;
  price: string;
  src: string;
  url: string;
  stock: string;
  review: string;
}

export async function POST(req: NextRequest) {
  try {
    // const { searchInput } = await req.json()

    // if (!searchInput) {
    //   return Response.json({ error: "No params provided", hasError: true })
    // }
    console.log("is here")

    const isProd = APP_ENV === 'production'
    const ROUTE = 'amazon'
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
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1, isLandscape: true });

    // to mobiles (change the input twotabsearchtextbox id)
    // await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 1, isMobile: true });

    await page.goto(BOOKS_ADDRESS, { waitUntil: "load" });

    // await page.type('#twotabsearchtextbox', searchInput);
    // await page.keyboard.press("Enter");
    // await page.waitForNavigation();



    // SAVE IMAGES
    // NO SOLUTION FOR NOW TO PRODUCCION ONLY IN LOCAL DEVELOPMENT
    if (isProd) {
      const url = `/var/task/.next/static/public/`
      await fs.promises.mkdir(url, { recursive: true });
      await fs.promises.mkdir(`${url}/${ROUTE}/`)
      const filePath = `${url}/${ROUTE}/${TWITHOUT_INPUT.BOOK_STORE as string}`;
      await page.screenshot({
        path: filePath,
        type: 'webp',
        // to save mb size to each image
        fullPage: false
      })

    } else {

      const rootUrl = process.cwd();
      const folderPath = `${rootUrl}${DIR_IMAGES}/${ROUTE}/`;
      const filePath = `${folderPath}${TWITHOUT_INPUT.BOOK_STORE as string}`;

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
      'section li',
      (resultItems) => {
        return resultItems.map((resultItem) => {
          const title = resultItem.querySelector(
            'h3 a',
          )?.getAttribute('title') ?? '';
          const price = resultItem.querySelector(
            '.product_price .price_color',
          )?.textContent ?? '';
          const stock = resultItem.querySelector(
            '.product_price .instock',
          )?.textContent?.trim() ?? '';
          const url = resultItem.querySelector('a')?.href;

          const src = resultItem.querySelector('.image_container img')?.getAttribute("src")?.trim();
          const review = resultItem.querySelector('.star-rating')?.classList
          let currentReview = ''

          if (review?.contains('One')) currentReview = 'One';
          else if (review?.contains('Two')) currentReview = 'Two';
          else if (review?.contains('Three')) currentReview = 'Three';
          else if (review?.contains('Four')) currentReview = 'Four';
          else if (review?.contains('Five')) currentReview = 'Five';


          if (title && price && url) {
            return {
              title,
              price,
              url,
              stock,
              src,
              review: currentReview
            };
          }
          return {
            title: '',
            price: '',
            url: '',
            stock: '',
            src: '',
            review: ''
          }
        });
      },
    );


    const rootSrc = `${BOOKS_ADDRESS}`
    const cleanData = cards.reduce((acc: OUT[], curr) => {
      if (curr.title !== '') {

        // ? FIXING SRC ROOT FROM THIS SCRAPPING
        const data = {
          ...curr,
          src: `${rootSrc}${curr.src}`
        }
        acc.push(data)
      }

      return acc
    }, [])


    await page.close();
    if (!page.isClosed()) await page.close()

    await browser.disconnect()
    // if (browser.connected) await browser.disconnect()


    return Response.json({ data: cleanData })
  } catch (error) {

    if (error instanceof Error) {

      const gistApiUrl = 'https://api.github.com/gists';
      const routeHandler = 'book-store'
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
