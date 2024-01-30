import puppeteer from "puppeteer";

import { NextRequest } from "next/server";
import { AMAZON_ADDRESS, DIR_IMAGES } from "@/lib/constants";

/**
 * Scrapping values from Amazon
 * return {cards} has contains
 * @returns {
 * title: string;
 * url: string;
 * price: string;
 * src: string;
 * reviews: string;
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

    const browser = await puppeteer.launch({
      args: ['--no-sandbox',],

      //? https://developer.chrome.com/docs/chromium/new-headless instead of true --> 'new'
      headless: 'new',
    });

    const page = await browser.newPage();

    // to monitors (only available)
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1, isLandscape: true });

    // to mobiles (change the input twotabsearchtextbox id)
    // await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 1, isMobile: true });

    await page.goto(AMAZON_ADDRESS, { waitUntil: "load" });

    await page.type('#twotabsearchtextbox', searchInput);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();

    // place to save the image
    await page.screenshot({
      path: `${DIR_IMAGES}/amazon/${searchInput}.webp`,
      type: 'webp',
      fullPage: true
    })

    const cards = await page.$$eval(
      '.s-search-results .s-card-container',
      (resultItems) => {
        return resultItems.map((resultItem) => {
          const url = resultItem.querySelector('a')?.href;
          const title = resultItem.querySelector(
            '.s-title-instructions-style span',
          )?.textContent;
          const price = resultItem.querySelector(
            '.a-price .a-offscreen',
          )?.textContent;

          const src = resultItem.querySelector('img')?.getAttribute("src")
          const review = resultItem.querySelector('span.a-size-base.s-underline-text')?.textContent;

          if (title && price && url) {
            return {
              url,
              title,
              price,
              src,
              review
            };
          }
          return {
            url: '',
            title: '',
            price: '',
            src: '',
            review: ''
          }
        });
      },
    );

    const cleanData = cards.filter(val => val.title !== '')

    await page.close();
    if (!page.isClosed()) await page.close()

    await browser.close();

    return Response.json({ data: cleanData })
  } catch (error) {

    console.error(error)
    return Response.json({ error: "API Error see logs", hasError: true })
  }
}
