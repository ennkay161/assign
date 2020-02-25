var mongoose = require('mongoose');

// Registeration user schema
var userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email :String,
    password :String,
    },
    {collection : 'registerSchemas' });
// Products Info Schema
var prodSchema = new mongoose.Schema({
    userID : String,
    pID : String,
    pName : String,
    pDesc :String,
    pImage :String,
    },
    {collection : 'productSchemas' });

// Reviews Schema
var reviewSchema = new mongoose.Schema({
    reviewMsg : {type:Array, required:true, trim:true},
    reviewDate : Date,
    prodId : String,
    },
    { collection : 'reviewSchemas'});

//module.exports = mongoose.model('users', userSchema);
module.exports.mySchema = mongoose.model('users', userSchema);
module.exports.prodSchema = mongoose.model('product',prodSchema);
module.exports.reviewSchema = mongoose.model('reviews',reviewSchema);