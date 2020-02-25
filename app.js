const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config/config');
app.use(bodyParser.text());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));    // to support URL-encoded bodies
 
mongoose.connect(config.db_url, { useNewUrlParser : true ,useUnifiedTopology: true} );
var db = mongoose.connection
        .once('open', () => console.log('Connected to Database'))
        .on("error", (err) => {
            console.log("Error: ",err);
            return;
        });


// Routing start -- /api/auth/register
var routeReg = require('./routes/register.js');
app.use('/api/auth', routeReg);

// api/auth/login
var routeLogin = require('./routes/login.js');
app.use('/api/auth', routeLogin);

// const checkStatus = (req,res, next)=>{
//         if(!req.headers.authorization)
//             return res.status(403).json( {err : "No credentials found!"});
        
//         console.log(req.headers.authorization);
//         next();
// }
// app.use(checkStatus);

// api/products
var routeProducts = require('./routes/products.js');
app.use('/api',routeProducts);

//api routeReviews
var routeReviews = require('./routes/reviews.js');
app.use('/api',routeReviews);

// Routing End
app.listen(6500, () => console.log('Server is Listening on port 6500..'));