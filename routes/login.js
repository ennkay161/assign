const express = require('express');
const app = express();
const route = express.Router();
const userSchema = require('../models/schema.js').mySchema;
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
app.use(bodyParser.text());
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));    // to support URL-encoded bodies
 
// POST Method
route.post('/login', (req,res) => {
    var jsonParse = JSON.parse(req.body);
    const fName = jsonParse.firstname;
    const lName = jsonParse.lastname;
    const email = jsonParse.email;
    const pwd = jsonParse.password;
    reg = new userSchema({
        firstName: fName,
        lastName : lName,
        email : email,
        password : pwd 
    });
    // Fetching Header
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader == 'undefined'){
        var token = jwt.sign({reg:reg}, config.key,{ expiresIn: 60 * 60 } );        
        res.json({
            success :true,
            message : 'Token is generated!',
            token : token
        });

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
            userSchema.findOne({email:email}).exec()
            .then(result => {
                if(!result)
                    console.log("Invalid Credentials.!");
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
                            console.log("Password Mismatch");
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
        //res.end();
        
});

// Verifying token
function verifyToken(req, res, next){
    // Get auth header value

}
module.exports = route;