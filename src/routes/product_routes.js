const ProductRoutes= require('express').Router();
const ProductController= require('./../controllers/product_controller');

ProductRoutes.post('/', ProductController.createProduct);
ProductRoutes.get('/', ProductController.fetchAllProducts);
ProductRoutes.get('/:id', ProductController.fetchProductById);
ProductRoutes.get('/category/:id', ProductController.fetchAllProductByCategoryId);



module.exports= ProductRoutes;