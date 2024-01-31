import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { DIR_IMAGES, INSTAGRAM } from "@/lib/constants";

/**
 * Scrapping values from Instagram
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
    console.log("there", searchInput)

    if (!searchInput) {
      return Response.json({ error: "No params provided", hasError: true })
    }

    const browser = await puppeteer.launch({
      args: ['--no-sandbox',],

      //? https://developer.chrome.com/docs/chromium/new-headless instead of true --> 'new'
      headless: false,
    });

    const page = await browser.newPage();

    // to monitors (only available)
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1, isLandscape: true });

    // to mobiles is the same the input ?
    // await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 1, isMobile: true });

    // timeout to 7 seconds
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

    return Response.json({ data: cleanData })
  } catch (error) {

    console.error(error)
    return Response.json({ error: "API Error see logs", hasError: true })
  }
}
