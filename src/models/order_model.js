const {Schema,model}= require('mongoose');

const orderItemsSchema= Schema({
    product:{type:Map,required:true},
    quantity:{type:Number,default:"1"}
})

const orderSchema=Schema({
    user:{type:Map, required: true},
    items:{type:[orderItemsSchema], default:[]},
    status:{type:String, default: "Order placed"},
    updatedOn:{type:Date},
    createdOn:{type:Date},
});
orderSchema.pre('save',function(next){
    this.updatedOn=new Date();
    this.createdOn=new Date();
    
   next();

})

orderSchema.pre(['update', "findOneAndUpdate", 'updateOne'], function(next){
    const update=this.getUpdate();
    delete update._id;
    this.updatedOn=new Date();

    next();

} );

const OrderModel=model('Order',orderSchema);
// const CategoryModel = mongoose.model('Category', categorySchema);


module.exports=OrderModel;