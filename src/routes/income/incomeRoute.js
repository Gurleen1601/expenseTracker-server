const express = require("express");
const {createIncCtrl,fetchAllIncCtrl,fetchIncDetailsCtrl,updateIncCtrl} = require("../../controllers/income/incomeCtrl");



const incomeRoute = express.Router();

incomeRoute.post("/",createIncCtrl);
incomeRoute.get("/",fetchAllIncCtrl);
incomeRoute.get("/:id",fetchIncDetailsCtrl);
incomeRoute.put("/:id",updateIncCtrl);
module.exports = incomeRoute;  