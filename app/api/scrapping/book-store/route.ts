// import puppeteer from "puppeteer-extra";
import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { BOOKS_ADDRESS, DIR_IMAGES, TWITHOUT_INPUT } from "@/lib/constants";
import getBrowser from "@/lib/get-browser";

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

    const browser = await getBrowser()
    
    const page = await browser.newPage();

    // to monitors (only available)
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1, isLandscape: true });

    // to mobiles (change the input twotabsearchtextbox id)
    // await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 1, isMobile: true });

    await page.goto(BOOKS_ADDRESS, { waitUntil: "load" });

    // await page.type('#twotabsearchtextbox', searchInput);
    // await page.keyboard.press("Enter");
    // await page.waitForNavigation();

    // place to save the image
    await page.screenshot({
      path: `${DIR_IMAGES}/book-store/${TWITHOUT_INPUT.BOOK_STORE as string}`,
      type: 'webp',
      fullPage: true
    })

    const rootSrc = `${BOOKS_ADDRESS}`

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

    const cleanData = cards.reduce((acc: OUT[], curr) => {
      if (curr.title !== '') {

        // ? VALIDATE the right root for src
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

    await browser.close();

    return Response.json({ data: cleanData })
  } catch (error) {

    console.error(error)
    return Response.json({ error: "API Error see logs", hasError: true, data: [] })
  }
}
