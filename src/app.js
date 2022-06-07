// require express for setting up the express server
const express = require('express');

//requiring the registerUser function from userCtrl.js to pass in the post req.
const {registerUser} = require('./controllers/users/usersCtrl');
const {errorHandler,notFound} = require("./middlewares/errorMiddleware");
const userRoute = require('./routes/users/usersRoute');
const dotenv=require("dotenv");
//importing the database into the server
const dbConnect = require('./config/dbConnect');
const incomeRoute = require('./routes/income/incomeRoute');
const expenseRoute = require('./routes/income/expenseRoute');

// using express
const app = express();

//env
dotenv.config();

//connecting the db
dbConnect();


//middlewares
app.use(express.json());

app.get('/',(req,res) => {
    res.json({msg:"Welcome To Expense Tracker"});
})

//users' routes
app.use('/api/users',userRoute);

//income routes
app.use('/api/income',incomeRoute);

//expenses routes
app.use('/api/expenses',expenseRoute);

 //error
app.use(notFound);
app.use(errorHandler);



module.exports=app;
