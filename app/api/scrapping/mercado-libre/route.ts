// import puppeteer from "puppeteer-extra";
import puppeteer from "puppeteer";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdBlocker from 'puppeteer-extra-plugin-adblocker';
import AnonymizeUA from 'puppeteer-extra-plugin-anonymize-ua';

import * as cheerio from "cheerio";
import { JSDOM } from 'jsdom'
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import proxyChain from 'proxy-chain';
import { ZenRows } from 'zenrows';
import { AMAZON_ADDRESS, DIR_IMAGES, MERCADO_LIBRE } from "@/lib/constants";

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
      headless: false,
    });

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
              url,
              title,
              price,
              src,
              condition,
            };
          }
          return {
            url: '',
            title: '',
            price: '',
            src: '',
            condition: '',
          }
        });
      },
    );
    console.log(cards.length)
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
