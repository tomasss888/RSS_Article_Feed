var Delfi_RSS = require("./functions/delfi/delfi_rss")
var fifteenMin_RSS = require("./functions/15min/15min_rss")
var delfi_scrape = require("./functions/delfi/delfi_scraping")
var fifteenMin_scrape = require("./functions/15min/15min_scraping")


const rssController = {

    getArticles(req, res) {

        sort = req.query.sort;

        Promise.all([Delfi_RSS.getRSS(), fifteenMin_RSS.getRSS()]).then(data => {
            return data[0].items.concat(data[1].items)
        }).then((results) => {
            // Sorts if necessary 
            if (sort === undefined)
                res.json(results)
            if (sort === "time")
                res.json(results.sort(function (a, b) {
                    return new Date(b.pubDate) - new Date(a.pubDate);
                }));
            if (sort === "alphabet")
                res.json(results.sort(function (a, b) {
                    var textA = a.title.toUpperCase();
                    var textB = b.title.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                }))

        })

    },

    getArticle(req, res) {

        if (req.query.target == "15min")
            fifteenMin_scrape.scrape(req.query.link).then((results) => {
                res.json(results)
            })
        if (req.query.target == "DELFI")
            delfi_scrape.scrape(req.query.link).then((results) => {
                res.json(results)
            })

    },

    delfi_rss(req, res) {

        Delfi_RSS.getRSS().then((results) => {
            res.json(results)
        })

    },

    fifteenMin_rss(req, res) {

        fifteenMin_RSS.getRSS().then((results) => {
            res.json(results)
        })

    },

    delfi_scrape(req, res) {

        delfi_scrape.scrape(req.query.link).then((results) => {
            res.json(results)
        })

    },

    fiftenMin_scrape(req, res) {

        fifteenMin_scrape.scrape(req.query.link).then((results) => {
            res.json(results)
        })

    },


};

module.exports = rssController;