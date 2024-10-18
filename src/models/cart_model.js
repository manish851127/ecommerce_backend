const {Schema,model}= require('mongoose');

const cartItemsSchema= Schema({
    product:{type:Schema.Types.ObjectId, ref:"Product"},
    quantity:{type:Number,default:"1"}
})

const cartSchema=Schema({
    user:{type:Schema.Types.ObjectId, ref:"User"},
    items:{type:[cartItemsSchema], def:[]},
    updatedOn:{type:Date},
    createdOn:{type:Date},
});
cartSchema.pre('save',function(next){
    this.updatedOn=new Date();
    this.createdOn=new Date();
    
   next();

})

cartSchema.pre(['update', "findOneAndUpdate", 'updateOne'], function(next){
    const update=this.getUpdate();
    delete update._id;
    this.updatedOn=new Date();

    next();

} );

const CardModel=model('Cart',cartSchema);
// const CategoryModel = mongoose.model('Category', categorySchema);


module.exports=CardModel;