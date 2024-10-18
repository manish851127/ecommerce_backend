const CartModel = require("../models/cart_model");
const OrderModel = require("../models/order_model");

const OrderController= {

    createOrder: async function(req, res){
        try{
         const {user, items}=req.body;
        const newOder= new OrderModel({
            user:user,
            items:items
        });
        await newOder.save();
       
        return res.json({success: true, data: newOder, message:"Order Created"});


        }catch(ex){
            return res.json({success: false,message:ex});
        };
        
    },
    fetchOrder: async function(req, res){
        try{
        const userId= req.params.userId;
        const foundUser=await OrderModel.find({
            "user.id":userId
        })
       
        return res.json({success: true, data: foundUser, message:"Order fetched"});


        }catch(ex){
            return res.json({success: false,message:ex});
        };
        
    },
    updateOrderStatus: async function(req, res){
        try{
        const {status, orderId}= req.body;
        const orderStatusUpdate=await OrderModel.findOneAndUpdate(
            { _id: orderId},
             {status:status},
             {new: true}
        );
         if(!orderStatusUpdate){
            return res.json({success: false,message:"not updated"});
 
         }
        return res.json({success: true, data: orderStatusUpdate});


        }catch(ex){
            return res.json({success: false,message:"exception"});
        };
        
    },


    
   };
module.exports =OrderController;


