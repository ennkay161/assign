const prodSchema = require('../models/productSchema.js').prodSchema;
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

// POST Method
module.exports.productsPost = (req,res) => {
    var jsonParse = JSON.parse(req.body);
    var userInfo,userId ;
    const bearerHeader = req.headers['authorization'];
    jwt.verify(bearerHeader,config.key, (err,authData) =>{
        if(err) {
            console.log(err);
            res.sendStatus(403);    // Forbidden
        }
        else
        {
            userInfo = authData.reg;
            userId = authData.reg._id;
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
                reg.save().then((result) => {
                        console.log(result);
                        res.json({
                            success: true,
                            message: 'Product Added Successfully!',
                            data: result,
                            user : {
                                    firstName : userInfo.firstName,
                                    lastName : userInfo.lastName,
                                    email : userInfo.email
                                    }
                         })
                    })
                     
            }
            catch(err){console.log("Your Error",err)}
        }
    });
}

// Getting product passing prodId
module.exports.productsGet = (req,res) => {         // /products/:productId
    let prodID = req.params.productId;
    prodSchema.find({pID:prodID})
            .populate('userID')
            .exec()
            .then(result => {
                if(result.length)
                {
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
}

// Delete
module.exports.productsDelete = (req,res) =>{       // /products/:prodId
    let prodId = req.params.prodId;
    console.log(prodId);
    prodSchema.deleteOne({pID:prodId},(err, result)=> {
        if(err) throw err;
        else{
            console.log(result);
            res.json({
                success:true,
                message: "Product Deleted Successfully",
                data: result
            })
        }
    })
}

//PUT Method
module.exports.productsPut = (req,res) => {
    let prodID = req.params.productId;
    const jsonParse = JSON.parse(req.body);
    const pid = jsonParse.pID;
    const pname = jsonParse.pName;
    const pdesc = jsonParse.pDesc;
    const pimg = jsonParse.pImage;
    var update = {
        pName: pname,
        pDesc: pdesc,
        pImage: pimg    
    }
    prodSchema.findOneAndUpdate({pID: prodID},update)
    .then(result =>{
        if(result)
        {
            prodSchema.find({pID:prodID}).exec()
            .then(result=>{
                res.json({
                    success: true,
                    message: 'Record Updated Successfully!',
                    data: result
                })
            })
        }
        else
        {
            res.json({
                success: false,
                message: 'Failed to update data! Invalid id!'
            })
        }
        
    })
}