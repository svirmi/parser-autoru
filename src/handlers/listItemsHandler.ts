const cheerio = require('cheerio');
import chalk from "chalk";

import {getPageContent} from "../helpers/puppeteer";
import {formatPrice, formatPeriod} from "../helpers/common";

export interface DataItem {
    title: string;     url: string;     code: string;
}

type DataItems = DataItem[];

export default async function listItemsHandler(data: DataItems) {
    try {
        for (const initialData of data) {
            console.log(chalk.green('Getting data from: ') + chalk.green.bold(initialData.url));
            const detailedContent = await getPageContent(initialData.url);
            const $ = cheerio.load(detailedContent);

            let period = $('.catalog-generation-summary__desc_period')
                .clone()
                .children()
                .remove()
                .end()
                .text();

            const priceNewStr           = $('.catalog-generation-summary__info .catalog-generation-summary__desc:nth-of-type(2)').text();
            const priceWithMileageStr   = $('.catalog-generation-summary__info .catalog-generation-summary__desc:nth-of-type(3)').text();

            let priceNew = priceNewStr ? formatPrice(priceNewStr) : null;
            let priceWithMileage = priceWithMileageStr ? formatPrice(priceWithMileageStr) : null;

            period = formatPeriod(period);

            if (!priceWithMileage && priceNew) {
                priceWithMileage = priceNew;
                priceNew = null;
            }

            console.log({
                priceNew,
                priceWithMileage,
                period
            });

        }
    } catch (err) {
        throw err;
    }
}

async function saveData(data: DataItems) {

}