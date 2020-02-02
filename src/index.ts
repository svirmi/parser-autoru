const puppeteer = require('puppeteer');
import cookie from "./helpers/cookie";

(async () => {
        try {
            const browser = await puppeteer.launch({args: ['--no-sandbox']});
            const page = await browser.newPage();
            await page.setCookie(...cookie);
            await page.goto('https://auto.ru/catalog/cars/all/?page_num=1', {waitUntil: 'networkidle2'});
            await page.waitFor(1000);
            await page.screenshot({path: './data/example.png'});
            await browser.close();

        } catch (err) {
            console.error(err);
        }
})();