var moment = require('moment');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const axios = require('axios');
var moment = require('moment');

// Scrapes Delfi for Article content
function scrape(link) {

    return new Promise(function (res, rej) {

        console.log("Scraping Delfi in - " + link);
        moment.locale(['lt', "en"]);

        axios.get(link)
            .then(html => {

                const $ = cheerio.load(html.data);
                
                title = $("h1").text().trim();
                description = $("div[class='delfi-article-lead']").text().trim();
                image = {
                    url: $(".image-article img:nth-of-type(1)").attr('src')
                }
                author = $(".delfi-author-name, .delfi-source-name").text().trim();
                pubDate = moment($(".delfi-source-date, .source-date").text(), "YYYY [m.] MMMM D [d.] HH:mm").format();
                article = $("div[class='col-xs-8'] > div:nth-child(1) > p")
                    .toArray()
                    .flatMap(element => ($(element).text().trim() != "") ? $(element).text().trim() : [])
                categories = $(".delfi-breadcrumbs  a > span")
                    .toArray()
                    .flatMap(element => ($(element).text().trim() != "") ? $(element).text().trim() : [])

                console.log("Scraping complete");
                res({ title, description, link, article, image, author, pubDate, categories })

            })


    })



}

module.exports = {
    scrape
}
