const expense = require("../models/expense");
const user = require("../models/user"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const RazorPay = require('razorpay');
const order = require("../models/orders");
const sequelize = require("../util/database");
const { route } = require("../routes/expenses");
require('dotenv').config();


exports.premiumMembership = async(req,res,next)=>{
    try{
            var rzp = new RazorPay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET
            })
            //console.log(rzp);
            const amount=2500;
            rzp.orders.create({amount, currency: "INR"}, (err,order)=>{
                if(err){
                    throw new Error(JSON.stringify(err));
                }
                req.user.createOrder({orderid: order.id, status: "PENDING"}).then(()=>{
                    return res.status(201).json({order, key_id: rzp.key_id});
                }).catch(err=>{
                    console.log(err);
                    return res.json({Error: err});
                })
            })

    }catch(err){
        console.log(err);
        res.json({Error: err});
    }
}


function generateAccessToken(id, isPremium){
    return jwt.sign({userId: id, isPremium}, 'secretKeyIsBiggerValue')
}


exports.updateStatus = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        const {payment_id, order_id} = req.body;
        //console.log(payment_id, order_id);
        const orders = await order.findOne({
            where: {
                orderid: order_id
            }
        },{
            transaction: transaction
        });
        console.log(payment_id);
        if(payment_id === null){
            res.json({success: false, msg:"Payment Failed"})
            return orders.update({paymentid: payment_id, status:"FAILED"});
        }
        await orders.update({paymentid: payment_id, status: "SUCCESSFUL"});
        //console.log(payment_id);
        await req.user.update({isPremium: true});
        res.json({success: true, msg:"Transaction Sccessfull", token: generateAccessToken(req.user.id, true)});
        await transaction.commit();
    }catch(err){
        await transaction.rollback();
        console.log(err);
        res.json({Err: err});
    }
}//