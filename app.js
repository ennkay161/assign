var bodyParser = require('body-parser');
const indexRoute = require('./routes/index');


module.exports = function(app){

    app.use(bodyParser.text());
    app.use('/api',indexRoute);

    //invalid Url
    app.all('*', function(req, res) {
        res.send("invalid url " + String(req.url));
      })
}