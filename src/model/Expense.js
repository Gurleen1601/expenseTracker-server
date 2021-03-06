const mongoose = require("mongoose");
const mongoosePaginate=require("mongoose-paginate-v2");
//create expense schema
const expenseSchema = new mongoose.Schema(
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
      default:"expense"
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
 //pagination
expenseSchema.plugin(mongoosePaginate);

const Expense = mongoose.model('Expense',expenseSchema);
module.exports = Expense;