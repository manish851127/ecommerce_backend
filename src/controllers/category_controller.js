const CategoryModel = require("../models/category_model");

const CategoryController= {
    createCategory: async function(req, res){
        try{
            const categoryData=req.body;
        const newCategory= CategoryModel(categoryData);

        await newCategory.save();
        return res.json({success: true, data: newCategory, message:"Category Created"});

        }catch(ex){
            return res.json({success: false,message:ex});
        }
        
    },
    fetchAllCategory: async function(req, res){
        try{
        const fetchAllCategory=await CategoryModel.find();

        return res.json({success: true, data: fetchAllCategory, message:"fetch all category"});

        }catch(ex){
            return res.json({success: false,message:ex});
        }
    },
    fetchCategoryById: async function(req, res){
        try{
            const id=req.params.id;
        const fetchById= await CategoryModel.findById(id);

         if(!fetchById){
            return res.json({success: false,message:"Category not found"});

        }

        return res.json({success: true, data: fetchById, message:"fetched all category"});

        }catch(ex){
            return res.json({success: false,message:ex});
        }
    },

};
module.exports =CategoryController;


