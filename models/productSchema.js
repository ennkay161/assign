var mongoose = require('mongoose');

// Products Info Schema
var prodSchema = new mongoose.Schema({
    userID : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },    // user - is model name in userSchema
    pID : String,
    pName : String,
    pDesc :String,
    pImage :String,
    },
    {collection : 'productSchemas' });

module.exports.prodSchema = mongoose.model('product',prodSchema);