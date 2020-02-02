const puppeteer = require('puppeteer');
import cookie from "./cookie";

export const LAUNCH_PUPPETEER_OPTS = {
    args: [
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--window-size=1920x1080'
    ]
};

export const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 5000,
  waitUntil: 'networkidle2',
  timeout: 30000
};

export async function getPageContent(url: string) {
    try {
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
        const page = await browser.newPage();
        await page.setCookie(...cookie);

        await page.goto(url, PAGE_PUPPETEER_OPTS);
        const content = await page.content();
        browser.close();

        return content;

    } catch (err) {
        throw err;
    }
}