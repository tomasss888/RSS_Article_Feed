var express = require('express');
var router = express.Router();

//------------------// controller routes
const rssController = require('../controller/rssController'); 
router.get('/rss/delfi', rssController.delfi_rss);  
router.get('/rss/15min', rssController.fifteenMin_rss);  
router.get('/scrape/delfi', rssController.delfi_scrape);  
router.get('/scrape/15min', rssController.fiftenMin_scrape);  
router.get('/getArticles', rssController.getArticles);  
router.get('/getArticle', rssController.getArticle);  

router.get('/', (req, res) => {
    res.send('it works')
})

module.exports = router;