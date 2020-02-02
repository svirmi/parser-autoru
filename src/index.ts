const cheerio = require('cheerio');
import chalk from "chalk";
import {slugify} from "transliteration";

import listItemsHandler, {DataItem} from "./handlers/listItemsHandler";
import {arrayFromLength} from "./helpers/common";
import {getPageContent} from "./helpers/puppeteer";

const SITE = 'https://auto.ru/catalog/cars/all/?page_num=';
const pages = 2;

const carsItems: DataItem[] = [];

(async () => {
        try {
            for(const page of arrayFromLength(pages)){
                const url = `${SITE}${page}`;
                const pageContent = await getPageContent(url);

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

                await listItemsHandler(carsItems);

            }
        } catch (err) {
            console.log(chalk.red('An error occured\n'));
            console.error(err);
        }
})();