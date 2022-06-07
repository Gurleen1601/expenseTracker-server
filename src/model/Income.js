const mongoose = require("mongoose");

//create income schema
const incomeSchema = new mongoose.Schema(
  {
    title: {
      required: [true, "Title is required"],
      type: String,
    },
    description: {
      required: [true, "Description is required"],
      type: String,
    },

    type: {
      type: String,
      default:"income"
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,//must be mongodb id
        ref:"User",
        required: [true, "User ID is required"]
    }
    },
      {
        timestamps: true,
      }
    );

const Income=mongoose.model('Income',incomeSchema);
module.exports = Income;