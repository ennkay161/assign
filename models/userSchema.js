var mongoose = require('mongoose');

// Registeration user schema
var userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email :String,
    password :{ type:String}
    },
    {collection : 'registerSchemas' });

    // filter
    userSchema.set('toJSON',{  // use to delete password from data when GET products details
        transform: function(doc, ret, opt){
            delete ret.password
            return ret
        }
    })
    module.exports.mySchema = mongoose.model('users', userSchema);
