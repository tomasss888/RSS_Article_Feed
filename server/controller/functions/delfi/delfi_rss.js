let Parser = require('rss-parser');
var moment = require('moment');

let parser = new Parser({
    customFields: {
        item: ['media:content', 'image', { keepArray: true }],
    }
});


function getRSS() {

    return new Promise(function (res, rej) {

        let feed

        (async () => {

            feed = await parser.parseURL('https://www.delfi.lt/rss/feeds/daily.xml');

        })().then(() => {

            moment.locale(['lt', "en"]);

            let items = new Array();
            let siteInfo = new Object();


            feed.items.forEach(function callback(item, index) {
                items.push(
                    {
                        title: feed.items[index].title,
                        link: feed.items[index].link,
                        pubDate: moment(feed.items[index].pubDate, "ddd, DD MMM YYYY hh:mm:ss ZZZZ").format("YYYY/MM/DD HH:mm:ss"),
                        image: {
                            url: feed.items[index]['media:content']['$'].url
                        },
                        description: feed.items[index].content,
                        siteInfo : {
                            title: "DELFI",
                            link: feed.link,
                            logo: {
                                url: "https://g1.dcdn.lt/glt/c/delfi-logo/delfi-ua.png"
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

/*

items	
0	
title	"Estijos gatvėse sustiprintos policijos pajėgos – siekiama užkirsti galimas provokacijas"
link	"https://www.delfi.lt/news/daily/world/estijos-gatvese-sustiprintos-policijos-pajegos-siekiama-uzkirsti-galimas-provokacijas.d?id=90162331&utm_source=rss&utm_medium=rss&utm_campaign=rss"
pubDate	"Sk, 08 Geg 2022 11:46:50 +0300"
comments	"https://www.delfi.lt/news/daily/world/estijos-gatvese-sustiprintos-policijos-pajegos-siekiama-uzkirsti-galimas-provokacijas.d?id=90162331&utm_source=rss&utm_medium=rss&utm_campaign=rss&com=1"
media:content	
$	
url	"https://g.delfi.lt/images/pix/518x0/BpcQqVIDd90/talinas-estija-keliones-senamiestis-88536975.jpg"
content	"Jau gegužės 9-osios išvakarėse Estijos policija patruliuoja sustiprintomis pajėgomis, kad užkirstų kelią galimoms provokacijoms, skelbia portalas err.ee."
contentSnippet	"Jau gegužės 9-osios išvakarėse Estijos policija patruliuoja sustiprintomis pajėgomis, kad užkirstų kelią galimoms provokacijoms, skelbia portalas err.ee."
guid	"https://www.delfi.lt/news/daily/world/estijos-gatvese-sustiprintos-policijos-pajegos-siekiama-uzkirsti-galimas-provokacijas.d?id=90162331"


*/