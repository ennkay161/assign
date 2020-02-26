const userSchema = require('../models/userSchema').mySchema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
 
// POST Method
module.exports.loginPost = (req,res)=>{
    var jsonParse = JSON.parse(req.body);
    const email = jsonParse.email;
    const pwd = jsonParse.password;
    reg = new userSchema({
        email : email,
        password : pwd 
    });
    // Fetching Header
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader == 'undefined'){
        userSchema.findOne({email:email}).exec()
            .then(result => {
                if(!result){
                    res.json({
                        success: false,
                        message: 'Invalid Credentials',
                    })
                    console.log("Invalid Credentials.!");
                }
                if(result){
                    if(result.email != email)
                    {
                        console.log(result.email);
                        console.log("User not found!");
                    }
                    bcrypt.compare(pwd,result.password,(err,isMatch) =>{
                        if(err) throw err;
                        if(isMatch){
                            var token = jwt.sign({reg:result}, config.key,{ expiresIn: 60 * 60 } );        
                            res.json({
                                success :true,
                                message : 'Token is generated!',
                                message: 'Welcome! Authentication Successful!',
                                token : token
                            });
                            console.log("Welcome! Authentication Successful!");
                        }
                        else
                            res.send('Password Mismatch!');
                    });
                }
            })
            .catch(err => {
                console.log(err);
                return;
            })
    }
    else
    {
        jwt.verify(bearerHeader,config.key, (err,authData) =>{
        // if invalid token transferred
        if(err) {
            console.log(err);
            res.sendStatus(403);    // Forbidden
        }
        else{
            console.log('USerId :',authData.reg._id);
            userSchema.findOne({email:email}).exec()
            .then(result => {
                if(!result){
                    res.json({
                        success: false,
                        message: 'Invalid Credentials',
                    })
                    console.log("Invalid Credentials.!");
                }
                if(result){
                    if(result.email != email)
                    {
                        console.log(result.email);
                        console.log("User not found!");
                    }
                    bcrypt.compare(pwd,result.password,(err,isMatch) =>{
                        if(err) throw err;
                        if(isMatch){
                            res.json({
                                success: true,
                                message: 'Welcome! Authentication Successful!',
                            });
                            console.log("Welcome! Authentication Successful!");
                        }
                        else
                            res.send("Password Mismatch");
                    });    
                }
            })
            .catch(err => {
                console.log(err);
                return;
            })
        }
        })
    }
}