const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.post('/api/jwt',(req,res) =>{
                // res.json({
                //                 message:'Hello JWT api'
                // });

                const user = {
                                id: 1,
                                name : 'neeraj'
                };
                jwt.sign({user:user},'secretkey',(err,token) =>{
                res.json({
                                token:token
                });
   
});
});


app.listen(9800,()=> console.log('Server is Listening on port 9800..'));