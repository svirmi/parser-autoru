#### auto.ru node.js test scraper : puppeteer, cheerio

##### Clone this repo
##### Build docker image

```bash
cd 
docker build -t autoru .
```

##### Run command to start project locally
```bash
docker run -it --rm -p 8080:8080 -u $(id -u ${USER}):$(id -g ${USER}) -v ${PWD}:/app autoru /bin/bash
```
Inside container run 
```bash
cd app
yarn start
```