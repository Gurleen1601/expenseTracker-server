const expressAsyncHandler= require('express-async-handler');
const jwt= require('jsonwebtoken');
const User = require('../model/User');

const authMiddleware=expressAsyncHandler(async (req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
     token=req?.headers?.authorization?.split(" ")[1];
     try{
       if(token){
           const decodedUser=jwt.verify(token,process.env.JWT_KEY);
           console.log(decodedUser);
        //find the user
        const user=User.findById(decodedUser?.id);
        //attach the user to the req object
        req.user = user;
        next();
       }
     }catch(error){
      throw new Error("Not authorized, Token expired");
     }
    }else{
       throw new Error("There's no token attached to the headers");
    }
});

module.exports=authMiddleware;