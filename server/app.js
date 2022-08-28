const express = require('express')
const app = express()
const port = 3000

// CORS settings
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3006");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// routes
var routes = require("./routes/router");
app.use("/", routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})