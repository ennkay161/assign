const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser : true ,useUnifiedTopology: true} );

var db = mongoose.connection
        .once('open', () => console.log('Connected to Database'))
        .on("error", (err) => {
            console.log("Error: ",err);
            return;
        });

var registerSchema = new Schema({
    // _id : mongoose.Schema.Types.ObjectID,
        // firstName : String, 
        // lastName : String,
        // email : String,
        // password : String
        
});
var registerS = new mongoose.Schema({title : String,
    desc : String,
    url :String,
    tags : Array,
    likes : Number},{
  collection : 'myCollection' });

//var register = mongoose.model('registerSchema',registerSchema);
    mongoose.model('registerS',registerS)
    .find({title:"Neeraj"}).exec()
    .then(res => {
        if(!res.length){
            console.log('User not found!');
            return;
        }
        else
            console.log(res); })
    .catch(err => {
        console.log(err);
        return;
    })
// var reg = new register({
//     //id : 101,
//     firstName: "Neeraj",
//     lastName : "Kumar",
//     email : "ennkay161@gmail.com",
//     password : "1234567" 
// });

// reg.save().then(res => {
//     console.log(res);
// });
// var reg2 = new register({
//     //id : 101,
//     firstName: "Rakesh",
//     lastName : "Yadav",
//     email : "rakesh123@gmail.com",
//     password : "1234567890" 
// });

// reg2.save().then(res => {
//    // console.log(res);
// });


//



// register.deleteMany({firstName:"Neeraj"}).exec();