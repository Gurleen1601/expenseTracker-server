const expressAsyncHandler = require('express-async-handler');
const Expense = require('../../model/Expense');


//create
const createExpCtrl=expressAsyncHandler(async(req,res)=>{
   const{title,amount,description,user}=req.body;
    try{
     const expense=await Expense.create({
         title,amount,description,user
     });
    res.json(expense);
    }catch(error){
     res.json(error);
    }
});


//fetch all expenses
const fetchAllExpCtrl=expressAsyncHandler(async(req,res)=>{
     try{
      const expense=await Expense.find();
     res.json(expense);
     }catch(error){
      res.json(error);
     }
 });

 //fetch single expenses
const fetchExpDetailsCtrl=expressAsyncHandler(async(req,res)=>{
    const {id} = req?.params;

    try{
     const expense=await Expense.findById(id);
    res.json(expense);
    }catch(error){
     res.json(error);
    }    
    
});

const updateExpCtrl=expressAsyncHandler(async(req,res)=>{

    const {id} = req?.params;
    const{title,amount,description}=req.body;
    try{
        const expense = await Expense.findByIdAndUpdate(id,{
            title,
            amount,
            description
        },
        {new : true}
        );
        res.json(expense);
    }
    catch(error) {
        res.json(error);
    }

});


const deleteExpCtrl=expressAsyncHandler(async(req,res)=>{
    const {id} = req?.params;

    try{
     const expense=await Expense.findByIdAndDelete(id);
    res.json(expense);
    }catch(error){
     res.json(error);
    }    
    
});

module.exports = {createExpCtrl,fetchAllExpCtrl,fetchExpDetailsCtrl,updateExpCtrl,deleteExpCtrl} ;