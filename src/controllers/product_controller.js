const productModel = require("../models/product_model");

const ProductController= {
    createProduct: async function(req, res){
        try{
         const productData=req.body;
        const newProduct= productModel(productData);

        await newProduct.save();
        return res.json({success: true, data: newProduct, message:"Category Created"});

        }catch(ex){
            return res.json({success: false,message:ex});
        }
        
    },
    fetchAllProducts: async function(req, res){
        try{
        const fetchAllProducts=await productModel.find();

        return res.json({success: true, data: fetchAllProducts, message:"fetch all product"});

        }catch(ex){
            return res.json({success: false,message:ex});
        }
    },
    fetchProductById: async function(req, res){
        try{
            const id=req.params.id;
        const fetchById= await productModel.findById(id);

         if(!fetchById){
            return res.json({success: false,message:"product not found"});

        }

        return res.json({success: true, data: fetchById, message:"fetched product by id"});

        }catch(ex){
            return res.json({success: false,message:ex});
        }
    },
    fetchAllProductByCategoryId: async function(req, res){
        try{
            const id=req.params.id;
        const fetchById= await productModel.find({category:id});

         if(!fetchById){
            return res.json({success: false,message:"product category not found"});

        }

        return res.json({success: true, data: fetchById, message:"fetched all product by category id"});

        }catch(ex){
            return res.json({success: false,message:ex});
        }
    },

};
module.exports =ProductController;


