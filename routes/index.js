const express = require('express');
const router = express.Router();
//const registerControl = require('../controllers/register');
//const loginControl = require('../controllers/login');
    // One way
    /*
        router
            .route('/auth/register')
            .post(registerControl.registerPost);
        router
            .route('/auth/login')
            .post(loginControl.loginPost);
    */
   // Another way
    require('./users')(router);
    require('./products')(router);
    require('./review')(router);

    router.all('*', function(req, res) {
        res.send("invalid url " + String(req.url));
      })

module.exports = router;
