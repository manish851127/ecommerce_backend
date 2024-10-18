const UserModel = require("../models/user_model");
const bcrypt= require("bcrypt");

const UserController={
  createAccount: async function(req,res) {

    try{
        const userData= req.body;
        const newUser=new UserModel(userData);
        await newUser.save();

        return res.json({success:true, data: newUser, message:"user created!"})
    }
    catch(e){
        return res.json({success:false,message: e})
    }
    
  },
  signIn: async function(req, res) {
    try{
      const {email, password}= req.body;

      const foundUser= await UserModel.findOne({email:email});
      if(!foundUser){
        return res.json({success:false,message: "user not found"});

      }
     const passwordMatched= bcrypt.compareSync(password,foundUser.password);
     if(!passwordMatched){
      return res.json({success:false,message: "password incorrect"})

     }
     return res.json({success: true, data: foundUser, })
    }
    catch(e){
      return res.json({success:false,message: e})

    }

  }
};
module.exports =UserController;