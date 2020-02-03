const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.goto('https://auto.ru/', {waitUntil: 'networkidle2'});

        await page.waitForSelector("#confirm-button");
        await Promise.all([
            page.click('#confirm-button'),
            page.waitForNavigation()
        ]);
        await page.screenshot({path: './data/example.png'});

        await browser.close();

    } catch (err) {
        console.error(err);
    }
})();