const express = require("express");
const routes = express.Router();
const admin = require("../controllers/add-expenses");
const premium = require("../controllers/premium")
const userControl = require("../controllers/user-control");
const userAuthentication = require('../middleware/auth');
const RazorPay = require('razorpay');


//adding user 
routes.post("/add-user", userControl.addUser);

//login user
routes.post("/user-login", userControl.userLogin);



module.exports = routes;//