const cheerio = require('cheerio');
import chalk from "chalk";

import {arrayFromLength} from "./helpers/common";
import {getPageContent} from "./helpers/puppeteer";

const SITE = 'https://auto.ru/catalog/cars/all/?page_num=';
const pages = 2;

(async () => {
        try {
            for(const page of arrayFromLength(pages)){
                const url = `${SITE}${page}`;
                const pageContent = await getPageContent(url);

                console.log(pageContent);

            }
        } catch (err) {
            console.log(chalk.red('An error occured\n'));
            console.error(err);
        }
})();