var moment = require('moment');
moment.locale('lt');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const axios = require('axios');
var moment = require('moment');

// Scrapes 15min for Article content
function scrape(link) {

    return new Promise(function (res, rej) {

        console.log("Scraping 15min in - " + link);
        moment.locale(['lt', "en"]);

        axios.get(link)
            .then(html => {

                const $ = cheerio.load(html.data);

                // Start scraping 
                title = $(".article-top > h1").text().trim();
                description = $(".article-top > .intro").text().trim();
                image = {
                    url: ((typeof ($("span > img").attr('href')) !== "undefined") ? $("span > img").attr('href') : "")
                        + ((typeof ($("span > img").attr('src') !== "undefined")) ? $("span > img").attr('src') : "")
                }
                author = $(".author-info, .article-source > a").text().trim().replace(/[\n\t\r]/g, "");
                pubDate = (moment($(".date > .publish").text(), "[Publikuota] YYYY MM DD, HH:mm").format() !== "Invalid date") ? 
                moment($(".date > .publish").text(), "[Publikuota] YYYY MM DD, HH:mm").format() :
                moment($(".date > .publish").text(), "[Publikuota] HH:mm").format()
                article = $(".article-content > div > p, .article-content > div > h2")
                    .toArray()
                    .flatMap(element => ($(element).text().trim() != "") ? $(element).text().trim() : [])
                categories = $(".breadcrumb > li:last-child span, .tags > a")
                    .toArray()
                    .flatMap(element => ($(element).text().trim() != "") ? $(element).text().trim() : [])

                res({ title, description, link, article, image, author, pubDate, categories })

            })

    })

}

module.exports = {
    scrape
}
