const express = require('express');
const app = express();
const route = express.Router();
const prodSchema = require('../models/schema.js').prodSchema;
const bodyParser = require('body-parser');
app.use(bodyParser.text());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));    // to support URL-encoded bodies
 
// POST Method
route.post('/products/:userid', (req,res) => {
    var jsonParse = JSON.parse(req.body);
    var userId = req.params.userid;
    console.log(userId);
    const pid = jsonParse.pID;
    const pname = jsonParse.pName;
    const pdesc = jsonParse.pDesc;
    const pimg = jsonParse.pImage;
    try{
        reg = new prodSchema({
            pID : pid,
            userID : userId,
            pName : pname,
            pDesc :pdesc,
            pImage :pimg,
        });
        reg.save().then((res) => {
                console.log(res);
            });
        res.end("Product Added Successfully!!");
           // var tokencl = token;     
    }
    catch(err){console.log("Your Error",err)}
    
});


// Getting product passing prodId
route.get('/products/:productId', (req,res) => {
    let prodID = req.params.productId;
    prodSchema.find({pID:prodID}).exec()
            .then(result => {
                if(result.length)
                {
                    console.log(result[0].pName);
                    res.json({
                        success: true,
                        message: 'Products fetched successfully!',
                        data : result
                    });
                }
                else
                    res.send("Invalid ID!");
                })
            .catch(err => {
                console.log(err);
                return;
            })
});


// Delete
route.delete('/products/:userid', (req,res) => {
    let userId = req.params.userid;
    console.log(userId);
    prodSchema.deleteOne({pID:userId},(err, result)=> {
        if(err) throw err;
        else{
            console.log(result);
            res.json({
                success:true,
                message: "Product Delete Successfully",
                data: result
            })
        }
    })
})

//PUT Method
route.put('/products/:productId', (req,res) => {
    let prodID = req.params.productId;
    const jsonParse = JSON.parse(req.body);
    const pid = jsonParse.pID;
    const pname = jsonParse.pName;
    const pdesc = jsonParse.pDesc;
    const pimg = jsonParse.pImage;
    prodSchema.find({pID:prodID}).exec()
            .then(result => {
                if(result.length)
                {
                    console.log(result[0].pName);
                    console.log(result[0].pDesc);
                    console.log(result[0].pImage);
                }
                else
                    res.send("Invalid ID!");
                })
            .catch(err => {
                console.log(err);
                return;
            })
});
module.exports = route;