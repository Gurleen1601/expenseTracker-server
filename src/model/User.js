const mongoose = require("mongoose");
const bcrypt=require('bcryptjs');

//create schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      required: [true, "First name is required"],
      type: String,
    },
    lastname: {
      required: [true, "Last name is required"],
      type: String,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      required: [true, "Hei buddy Password is required"],
    },

    isAdmin: {
        type: Boolean,
        default: false,
      },
    },
      {
        timestamps: true,
      }
    );
  //hash password
  //before a user is saved
  userSchema.pre('save', async function(next){
    //when user is update
    if(!this.isModified('password')){
      next();
    }
    //salt is a way of hashing user passwords
      const salt=await bcrypt.genSalt(10);
      //this represents the instance  of the user
      this.password=await bcrypt.hash(this.password,salt);
      next();
    });
    
//verify password
userSchema.methods.isPasswordMatch=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

//Compile schema into model
const User = mongoose.model("User", userSchema);

module.exports = User;