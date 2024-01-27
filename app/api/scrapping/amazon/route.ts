import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdBlocker from 'puppeteer-extra-plugin-adblocker';

import * as cheerio from "cheerio";
import { JSDOM } from 'jsdom'
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

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
  // const params = req.nextUrl.searchParams
  // const searchInput = params.get("searchInput")
  try {

    const { searchInput } = await req.json()

    if (!searchInput) {
      return Response.json({ error: "No params provided", hasError: true })
    }
    StealthPlugin()
    console.log("evasion", StealthPlugin().enabledEvasions)

    const enableEvasion =StealthPlugin().enabledEvasions
    const browser = await puppeteer
      .use(StealthPlugin())
      .use(AdBlocker())
      .launch({
        headless: false,
        executablePath: process.env.EXECUTABLE_GC as string ?? '/usr/bin/google-chrome',
        args: ['--no-sandbox']
      });

    const page = await browser.newPage();
    // await page.setViewport({ width: 1080, height: 1024 });
    // page.setDefaultNavigationTimeout(2 * 60 * 1000)

    await page.goto('https://amazon.com')
    await page.waitForNavigation(),


    // const which = await page.content()
    // console.log(which)

    // await page.waitForNavigation()
    await page.type('#twotabsearchtextbox', searchInput);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();


    // return Response.json({ data: "asdfasdf",  })

    // const bodyHandle = await page.$('.s-search-results');
    // const html = await page.evaluate(body => body?.innerHTML, bodyHandle);
    // console.log("has", html)
    // await bodyHandle?.dispose();


    // const vals = await ress?.$$eval(
    //     '.s-card-container',
    //     // '.s-search-results .a-section',
    //     (resultItems) => {
    //       return resultItems.map((resultItem) => {
    //         if (resultItem) {
    //           const urlElement = resultItem.querySelector('a');
    //           const titleElement = resultItem.querySelector(
    //             '.s-title-instructions-style span',
    //           );
    //           const priceElement = resultItem.querySelector('.a-price .a-offscreen');
    //           // const imageElement = resultItem.querySelector('.s-product-image-container .s-image');
    //           const imageElement = resultItem.querySelector('.s-image img')

    //           const reviewElement = resultItem.querySelector('span.a-size-base.s-underline-text');

    //           if (urlElement && titleElement && priceElement && imageElement && reviewElement) {
    //             const url = urlElement.href;
    //             const title = titleElement.textContent;
    //             const price = priceElement.textContent;

    //             const src = imageElement.getAttribute('src');
    //             const review = reviewElement.textContent
    //             return {
    //               title,
    //               price,
    //               url,
    //               src,
    //               review
    //             };
    //           }
    //         }

    //         return {
    //           title: '',
    //           price: '',
    //           url: '',
    //           src: '',
    //           review: '',
    //         };
    //       });
    //     },
    //   );

    const capture = await page.screenshot({
      // path: 'bot.jpg',
      fullPage: true
    })

    console.log(capture.length)

    // const already = await page.$$eval(
    //   '.s-search-results .s-card-container',
    //   (resultItems) => {
    //     return resultItems.map((resultItem) => {
    //       const url = resultItem.querySelector('a')?.href;
    //       const title = resultItem.querySelector(
    //         '.s-title-instructions-style span',
    //       )?.textContent;
    //       const price = resultItem.querySelector(
    //         '.a-price .a-offscreen',
    //       )?.textContent;

    //       const src = resultItem.querySelector('img')?.getAttribute("src")
    //       const review = resultItem.querySelector('span.a-size-base.s-underline-text')?.textContent;

    //       if (title && price && url) {
    //         return {
    //           url,
    //           title,
    //           price,
    //           src,
    //           review
    //         };
    //       }
    //       return {
    //         url: '',
    //         title: '',
    //         price: '',
    //         src: '',
    //         review: ''
    //       }
    //     });
    //   },
    // );


    await page.close();
    console.log(page.isClosed())
    await browser.close();


    return Response.json({ data: "result", capture })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "API Error see console logs", hasError: true })
  }
}
