const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/neeraj", { useNewUrlParser : true ,useUnifiedTopology: true} );

var db = mongoose.connection
        .once('open', () => console.log('Connected to Database'))
        .on("error", (err) => {
            console.log("Error: ",err);
            return;
        });

var registerS = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email :String,
    password :String,
    },
    {collection : 'registerschemas' });

var register = mongoose.model('registerS',registerS);

register.find({firstName:"Nirmala"}).exec()
var findUser = register.find( { firstName: { $exists: true } } );
console.log(findUser);
    // .then(res => {
    //     console.log("Found by name");
    //     console.log(res); })
    // .catch(err => {
        
    //     console.log(err);
    //     return;
    // })


// register.deleteMany({firstName:"Neeraj"}).exec();