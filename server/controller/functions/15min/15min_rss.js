let Parser = require('rss-parser');
var moment = require('moment'); // require
const cheerio = require('cheerio');

let parser = new Parser();


function getRSS() {

    return new Promise(function (res, rej) {

        let feed

        (async () => {

            feed = await parser.parseURL('https://www.15min.lt/rss');

        })().then(() => {

            moment.locale('en');

            let items = new Array();
            let siteInfo = new Object();

            feed.items.forEach(function callback(item, index) {
                const $ = cheerio.load(feed.items[index].content);
                items.push(
                    {
                        title: feed.items[index].title,
                        link: feed.items[index].link,
                        pubDate: moment(feed.items[index].pubDate).format("YYYY/MM/DD HH:mm:ss"),
                        image: {
                            url: $("html").find('img').attr('src')
                        },
                        description: $('html').text().replace(/[\n\t\r]/g, ""),
                        categories: feed.items[index].categories,
                        author: feed.items[index].author,
                        siteInfo : {
                            title: "15min",
                            link: feed.link,
                            copyright: feed.copyright,
                            lastBuildDate: feed.lastBuildDate,
                            logo: {
                                url: "https://www.15min.lt/img/logos/15min_logo_spalvotas_RGB_1647817286.svg"
                            },
                        }
                    }
                )
            });

            let feedResctructure = { ...siteInfo, items }

            res(feedResctructure);
        });
    })

}

module.exports = {
    getRSS
}
