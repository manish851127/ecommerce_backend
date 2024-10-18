const {Schema,model}= require('mongoose');

const uuid= require('uuid');

const CategorySchema=Schema({
    id:{type: String, unique:true},
    title: {type: String, required:[true, "Category is required"], unique: true},
    description:{type:String, default: ""},
    updatedOn:{type:Date},
    createdOn:{type:Date},
});
CategorySchema.pre('save',function(next){
    this.id=uuid.v1();
    this.updatedOn=new Date();
    this.createdOn=new Date();
    
   next();

})

CategorySchema.pre(['update', "findOneAndUpdate", 'updateOne'], function(next){
    const update=this.getUpdate();
    delete update._id;
    delete update.id;
    this.updatedOn=new Date();

    next();

} );

const CategoryModel=model('Category',CategorySchema);
// const CategoryModel = mongoose.model('Category', categorySchema);


module.exports=CategoryModel;