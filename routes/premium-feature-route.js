const express = require("express");
const routes = express.Router();
const admin = require("../controllers/add-expenses");
const premium = require("../controllers/premium")
const premiumFeature = require("../controllers/premium-features");
const userAuthentication = require('../middleware/auth');
const RazorPay = require('razorpay');

//leaderboard
routes.get("/leaderboard",userAuthentication.authenticate, premiumFeature.leaderboardDetails);

//download particular user expense
routes.get("/download",userAuthentication.authenticate, premiumFeature.downloadExpense);




module.exports = routes;//