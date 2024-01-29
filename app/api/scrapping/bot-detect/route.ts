import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { BOT_DETECT_ADDRESS, DIR_IMAGES } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {

    const browser = await puppeteer.launch({
      args: ['--no-sandbox',],
      headless: 'new',
    });

    const page = await browser.newPage();

    await page.goto(BOT_DETECT_ADDRESS, { waitUntil: "load" });

    const capture = await page.screenshot({
      path: `${DIR_IMAGES}/bot-detect/bot_analyse.webp`,
      type: 'webp',
      fullPage: true,
    });

    return Response.json({ status: 200, capture });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "API Error, see console logs", hasError: true });
  }
}
