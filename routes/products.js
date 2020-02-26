var routeProducts = require('../controllers/products.js');
// Products Routes

module.exports = (router)=>
{
        router.post('/products',(req,res) => {
            routeProducts.productsPost(req,res);
        })
        
        router.get('/products/:productId',(req,res) => {
            routeProducts.productsGet(req,res);
        })
        
        router.delete('/products/:prodId',(req,res) => {
            routeProducts.productsDelete(req,res);
        })
        
        router.put('/products/:productId',(req,res) => {
            routeProducts.productsPut(req,res);
        })
}

