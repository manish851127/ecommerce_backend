const OrderRoutes= require('express').Router();
const OrderController= require('./../controllers/order_controller');

OrderRoutes.post('/', OrderController.createOrder);
OrderRoutes.get('/:userId', OrderController.fetchOrder);
OrderRoutes.put('/status', OrderController.updateOrderStatus);



module.exports= OrderRoutes;