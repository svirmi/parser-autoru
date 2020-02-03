import fs from "fs";
import chalk from "chalk";

export default async function saveData(data: any) {
    const {code} = data;
    const fileName = `${code}.json`;
    const savePath = './data/' + fileName;

    return new Promise((resolve, reject) => {
        fs.writeFile(savePath, JSON.stringify(data, null, 4), err => {
            if(err) {
                return reject(err);
            }

            console.log(chalk.blue.bold(fileName) + ' saved');

            resolve();
        });
    });
}