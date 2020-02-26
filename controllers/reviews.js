const reviewSchema = require('../models/reviewSchema.js').reviewSchema;
const prodSchema = require('../models/productSchema.js').prodSchema;
 
// POST Method
module.exports.reviewsPost = (req,res) => {
    console.log(req.body);
    var jsonParse = JSON.parse(req.body);
    var review = jsonParse.review;
    var prodID = req.params.id;
    reg = new reviewSchema({
        reviewMsg : review,
        reviewDate : new Date(),
        prodId : prodID,
    });
    prodSchema.find({pID:prodID}).exec()
            .then(result => {
                if(result.length)
                {
                    reg.save().then((result) => {
                            console.log(result);
                            res.json({
                                success: true,
                                message: 'Review Added Successfully!'
                            })
                        });
                }
                else
                    res.send("Invalid ID!");
                })
            .catch(err => {
                console.log(err);
                return;
            })
}

// Get Method
module.exports.reviewsGet = (req,res) => {
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
}