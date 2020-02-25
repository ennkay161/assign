const express = require('express');
const app = express();
const route = express.Router();
const reviewSchema = require('../models/schema.js').reviewSchema;
const bodyParser = require('body-parser');
app.use(bodyParser.text());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended:true }));    // to support URL-encoded bodies
 
// POST Method
route.post('/reviews/:id', (req,res) => {
    console.log(req.body);
    var jsonParse = JSON.parse(req.body);
    var review = jsonParse.review;
    var prodID = req.params.id;
    try{
        reg = new reviewSchema({
            reviewMsg : review,
            reviewDate : new Date(),
            prodId : prodID,
        });
        reg.save().then((res) => {
                console.log(res);
            });
        res.end("Review Added!!");
    }
    catch(err)
    {console.log("Error",err)}
    
});

// Get Method
route.get('/reviews/:prodId', (req,res) => {
    try{
        let productID = req.params.prodId;
        reviewSchema.find({prodId:productID}).exec()
                .then(result => {
                    if(result.length)
                        res.json(result);
                    else
                        res.send("Invalid ID!");
                    })
                .catch(err => {
                    console.log(err);
                    return;
                })
    }
    catch(err)
    {console.log("Error Occured",err)}
    
});
module.exports = route;