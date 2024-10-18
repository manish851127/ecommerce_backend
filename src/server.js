const express= require("express");
const bodyParser=require("body-parser");
const helmet=require("helmet");
const morgan=require("morgan");
const cors=require("cors");
const mongoose=require("mongoose");

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

mongoose.connect("mongodb+srv://maishk07:0PJXanXQnC37C55f@cluster2.tynou.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce");

const UserRoutes=require('./routes/user_router');
app.use("/api/user", UserRoutes);

const CategoryRoutes=require('./routes/category_routes');
app.use("/api/category", CategoryRoutes);

const ProductRoutes=require('./routes/product_routes');
app.use("/api/product", ProductRoutes);

const CartRoutes=require('./routes/cart_routes');
app.use("/api/cart", CartRoutes);

const OrderRoutes=require('./routes/order_routes');
app.use("/api/order", OrderRoutes);

app.listen(5000, ()=>{
    console.log("Server started at 5000");
})