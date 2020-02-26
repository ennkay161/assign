var routeReviews = require('../controllers/reviews.js');
// Reviews Routes
module.exports = (router)=> {

    router.post('/reviews/:id',(req,res)=>{
        routeReviews.reviewsPost(req,res);
    })

    router.get('/reviews/:prodId',(req,res)=>{
        routeReviews.reviewsGet(req,res);
    })
}