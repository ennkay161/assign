const userSchema = require('../models/userSchema.js').mySchema;
const bcrypt = require('bcryptjs');

// POST Method
module.exports.registerPost = (req,res) =>{
    try{
        var jsonParse = JSON.parse(req.body);
        const fName = jsonParse.firstName;
        const lName = jsonParse.lastName;
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
    }
    catch(err)
    {
        console.log('Error is' ,err);
        res.send("Error");
    }
}