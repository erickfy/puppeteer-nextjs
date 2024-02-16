import puppeteer from "puppeteer";
import { NextRequest } from "next/server";
import { BOT_DETECT_ADDRESS, DIR_IMAGES, TWITHOUT_INPUT } from "@/lib/constants";
import sharp from 'sharp';
import getBrowser from "@/lib/get-browser";


/**
 * API to detect robots 
 * @returns {
 * data: [Buffer]
 * }
 * when it has error 
 * @returns {
 * error: string;
 * hasError: boolean;
 * } 
 */
export async function POST(req: NextRequest) {
  try {

    const captureBuffer = await captureScreenshot();

    const processedBuffer = await sharp(captureBuffer).webp().toBuffer();

    return Response.json({ data: [processedBuffer] });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "API Error, see console logs", hasError: true });
  }
}


async function captureScreenshot() {
  // const browser = await puppeteer.launch({
  //   args: ['--no-sandbox'],
  //   headless: 'new',
  // });

  const browser = await getBrowser()

  const page = await browser.newPage();

  await page.goto(BOT_DETECT_ADDRESS, { waitUntil: 'load' });

  const capture = await page.screenshot({
    path: `${DIR_IMAGES}/bot-detect/${TWITHOUT_INPUT.BOT_DETECT}`,
    type: 'webp',
    fullPage: true,
  });

  await page.close()
  await browser.close();

  return capture;
}