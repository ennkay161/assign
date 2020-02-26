var express = require("express");
var http = require("http");
var app = express();
const mongoo = require('mongoose');
const config = require('./config/config');


mongoo.connect(config.db_url, { useNewUrlParser : true ,useUnifiedTopology: true, useFindAndModify: false} );
var db = mongoo.connection
        .once('open', () => console.log('Connected to Database'))
        .on("error", (err) => {
            console.log("Error: ",err);
            return;
        });
require('./app')(app);
http.createServer(app).listen(6500,()=> console.log('Server is listening on port 6500'));