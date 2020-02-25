const express = require('express');
const app = express();
const route = express.Router();
const userSchema = require('../models/schema.js').mySchema;
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
app.use(bodyParser.text());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));      // to support URL-encoded bodies
// Pass encryption


// POST Method
route.post('/register', (req,res) => {
    var jsonParse = JSON.parse(req.body);
    const fName = jsonParse.firstname;
    const lName = jsonParse.lastname;
    const email = jsonParse.email;
    const pwd = jsonParse.password;

    reg = new userSchema({
        //id : 101,
        firstName: fName,
        lastName : lName,
        email : email,
        password : pwd 
    });

    var userInfo = {
        firstName:fName,
        lastName: lName,
        email: email
    };
   
    userSchema.findOne({email:email}).exec()
            .then(result => {
                if(result)
                {
                    res.json({
                        success:false,
                        message: "Email Existed!",
                        data : {}
                    })
                }
                else{
                    bcrypt.genSalt(10,(err, salt) => {
                        bcrypt.hash(reg.password,salt, (err,hash) => {
                            if(err) throw err;
                            reg.password = hash;
                            reg.save().then(res => { 
                             console.log(res);
                         });
                       });
                     });
                     res.json({
                        success:true,
                        message: "User Registered Successfully",
                        data : userInfo
                    });
                }
            })
            .catch(err => {
                console.log(err);
                return;
            });
});

module.exports = route;