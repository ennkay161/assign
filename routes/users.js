var routeReg = require('../controllers/register.js');
var routeLogin = require('../controllers/login.js');

module.exports = (router) =>{

    router.post('/auth/register', (req,res)=>{
        routeReg.registerPost(req,res);
    })

    // api/auth/login - POST
    router.post('/auth/login', (req,res) => {
        routeLogin.loginPost(req,res);
    })

    //Middleware for token validation
    const checkStatus = (req,res, next)=>{
        if(!req.headers.authorization)
            return res.status(403).json( {err : "No credentials found!"});
        //console.log(req.headers.authorization);
        next();
    }
    router.use(checkStatus);
}
