const expressAsyncHandler = require('express-async-handler');
const res = require('express/lib/response');
const Income = require('../../model/Income');


//create
const createIncCtrl=expressAsyncHandler(async(req,res)=>{
   const{title,amount,description,user}=req.body;
    try{
     const income=await Income.create({
         title,amount,description,user
     });
    res.json(income);
    }catch(error){
     res.json(error);
    }
});

//fetch all incomes
const fetchAllIncCtrl=expressAsyncHandler(async(req,res) => {
    try{
        const income=await Income.find();
        res.json(income);
    }catch(error){
     res.json(error);
    }
}); 

//fetch single income
const fetchIncDetailsCtrl=expressAsyncHandler(async(req,res) => {
    const {id} = req?.params;
    try{
       const income=await Income.findById(id);
        res.json(income);
      }catch(error){
     res.json(error);
    }
}); 

//update income
    const updateIncCtrl=expressAsyncHandler(async(req,res) => {
        const {id} = req?.params;
        const{title,amount,description}=req.body;
        try{
        const income=await Income.findByIdAndUpdate(id,{
            title,amount,description
        },
        {new:true }
        );
        res.json(income);
        }catch(error){
        res.json(error);
        }
    }); 

//delete income
const deleteIncCtrl=expressAsyncHandler(async(req,res) => {
    const {id} = req?.params;
    try{
       const income=await Income.findByIdAndDelete(id);
        res.json(income);
      }catch(error){
     res.json(error);
    }
}); 

module.exports = {createIncCtrl,fetchAllIncCtrl,fetchIncDetailsCtrl,updateIncCtrl,deleteIncCtrl};