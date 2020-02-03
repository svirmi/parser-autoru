const cheerio = require('cheerio');
import chalk from "chalk";
import {slugify} from "transliteration";

import listItemsHandler, {DataItem} from "./handlers/listItemsHandler";
import {arrayFromLength} from "./helpers/common";
import {PuppeteerHandler} from "./helpers/puppeteer";
var queue = require("async/queue");

const SITE = 'https://auto.ru/catalog/cars/all/?page_num=';
const pages = 4;
const concurrency = 10;
const startTime:any = new Date();

export const p = new PuppeteerHandler();

export const taskQueue = queue(async (task:any, done:any) => {
    try {
        await task();
        console.log(chalk.bold.magenta('Task completed, task left: ' + taskQueue.length() + '\n'));
        done();
    } catch (err) {
        throw err;
    }
}, concurrency);

taskQueue.drain(function () {
    const endTime:any = new Date();
    console.log(chalk.green.bold(`All done . [${(endTime - startTime) / 1000}s]\n`));
    p.closeBrowser();
    process.exit();
});

(function main() {
    arrayFromLength(pages).forEach(page => {
        const url = `${SITE}${page}`;

        taskQueue.push(
            () => listPageHandler(url),
            (err:any) => {
                if(err) {
                    console.log(err);
                    throw new Error('Error getting data from page ' + url);
                }
                console.log(chalk.green('Page ' + url + ' done\n'));
            }
        );
    });
})();


async function listPageHandler(url:string) {
    try {
        const carsItems: DataItem[] = [];

        const pageContent = await p.getPageContent(url);
        const $ = cheerio.load(pageContent);


        $('.mosaic__title').each((i: number, header: string) => {
            const url = $(header).attr('href');
            const title = $(header).text();
            carsItems.push({
                title,
                url,
                code: slugify(title)
            });
        });

        listItemsHandler(carsItems);

    } catch (err) {
        console.log(chalk.red('An error occured\n'));
        console.error(err);
    }
}