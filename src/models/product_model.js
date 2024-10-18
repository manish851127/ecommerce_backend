const {Schema,model}= require('mongoose');

const productSchema=Schema({
    category:{type: Schema.Types.ObjectId, ref:"Category", required: true},
    title: {type: String, required:[true, "Category is required"], unique: true},
    price:{type: Number, required: true,},
    images:{type: Array, default:[],required: true},
    description:{type:String, default: ""},
    updatedOn:{type:Date},
    createdOn:{type:Date},
});
productSchema.pre('save',function(next){
    this.updatedOn=new Date();
    this.createdOn=new Date();
    
   next();

})

productSchema.pre(['update', "findOneAndUpdate", 'updateOne'], function(next){
    const update=this.getUpdate();
    delete update._id;
    this.updatedOn=new Date();

    next();

} );

const productModel=model('Product',productSchema);
// const CategoryModel = mongoose.model('Category', categorySchema);


module.exports=productModel;