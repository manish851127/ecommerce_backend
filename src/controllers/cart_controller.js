const CartModel = require("../models/cart_model");

const CartController= {

    addToCart: async function(req, res){
        try{
         const {user, product, quantity}=req.body;
        const foundCart=await CartModel.findOne({user:user});

        if(!foundCart){
            const newCart=new CartModel({user:user});
            newCart.items.push({
                product: product,
                quantity:quantity,
            });
            await newCart.save();

           return res.json({success: true, data: newCart, message:"Product added to cart"});
        };

        // Deleting the items if it already exist
      const deletedItem=  await CartModel.findOneAndUpdate(
            {user:user, "items.product":product},
            {$pull: {items:{ product: product }}},
            {new:true}
        )
      


        // if cart already exits
       const upadatedCart= await CartModel.findOneAndUpdate(
            {user:user },
            {$push:{ items: { product:product, quantity:quantity}}},
            {new:true}
        ).populate("items.product");

        return res.json({success: true, data: upadatedCart.items, message:"Cart Updated"});


        }catch(ex){
            return res.json({success: false,message:ex});
        };
        
    },
    removeFromCart:async function (req,res){
        try{

            const {user, product}= req.body;
            const newUpdatedCard=await CartModel.findOneAndUpdate(
                {user: user},
                {$pull: {items:{product:product}}},
                {new:true}
            ).populate("items.product");
            return res.json({success: true, data: newUpdatedCard.items, message:"Product remomove from cart"});


        }catch(ex){
            return res.json({success: false,message:ex});

        }

    },

     getCartForUser: async function (req, res){
        try{
        const user= req.params.user;
        const foundCart=await CartModel.findOne({user:user}).populate("items.product");
        if(!foundCart){
            return res.json({success: true,message:""});

        }
        
        return res.json({success: true, data: foundCart.items, message:"User Cart found"});
        }catch(e){
            return res.json({success: false,message:ex});

        }
        
     }
    
   };
module.exports =CartController;


