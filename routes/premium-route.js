const express = require("express");
const routes = express.Router();
const admin = require("../controllers/add-expenses");
const premium = require("../controllers/premium")
const userAuthentication = require('../middleware/auth');
const RazorPay = require('razorpay');

//premium membership
routes.get("/premium-membership", userAuthentication.authenticate, premium.premiumMembership);

//update Transactions
routes.post("/update-transaction-status", userAuthentication.authenticate, premium.updateStatus);



module.exports = routes;//