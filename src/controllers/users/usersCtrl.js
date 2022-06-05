const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../middlewares/generateToken');
const User = require('../../model/User');
const registerUser = expressAsyncHandler(async(req,res) =>{
    const { email, firstname, lastname, password } = req?.body;

    //checking if user exists
    const userExists=await User.findOne({email});
   if(userExists) throw new Error("User already exists");
    try {
        
        const userExists = await User.findOne({email});
        const user = await User.create({email, firstname, lastname, password});
        res.status(200).json(user);
    
    }
    catch(error)
    {
        res.json(error);
    }

});

//fetch all users
const fetchUsersCtrl=expressAsyncHandler(async(req,res) =>{
    try{
       const users=await User.find({});
       res.json(users);
    }catch(error){
       res.json(error);
    }
 });

//login user
const loginUserCtrl=expressAsyncHandler(async (req,res)=>{
    const {email,password}=req?.body;
    //find the user in db
    const userFound=await User.findOne({email});
   //check if the user password matches (AUTHENTICATION)
   if(userFound &&( await userFound?.isPasswordMatch(password))){
       res.json({
           _id: userFound?._id,
           firstname: userFound?.firstname,
           lastname: userFound?.lastname,
           email: userFound?.email,
           isAdmin:userFound?.isAdmin,
           token:generateToken(userFound?._id) //token given to the user for authorization
       });
   }
   else{
    res.status(401);
    throw new Error('Invalid login credentials');
   }
});
module.exports = { registerUser , fetchUsersCtrl, loginUserCtrl};