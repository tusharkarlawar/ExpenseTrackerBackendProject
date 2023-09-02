//here we add, get and deleted the expense//
const expense = require("../models/expense");
const user = require("../models/user"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const RazorPay = require('razorpay');
const order = require("../models/orders");
const sequelize = require("../util/database");
require('dotenv').config();
exports.addExpenses = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        
        const description = req.body.description;
        const amount = req.body.amount;
        const category = req.body.category;
        console.log(description, amount);
        let totalExpense=0;
        const data = await expense.create({
            description: description,
            amount: amount,
            category: category,
            userId: req.user.id
        },
        {transaction: transaction})
        totalExpense = Number(req.user.totalExpense)+ Number(amount);
        await user.update({
            totalExpense:totalExpense
        },
        {
            where:{id: req.user.id},
            transaction: transaction
        }
        )
        console.log(req.user.id);
        res.json({newexpense: data, success: true});
        await transaction.commit();
    }
    catch(err){
        await transaction.rollback();
        console.log(err);
        res.json({
            Error: err
        });
        
       
    }
}
exports.getExpenses = async(req,res,next)=>{
    try{
        const data = await expense.findAll({where: {userId: req.user.id }})
        //console.log(data);
            return res.json({allExpense: data});
        
        
    }catch(err){
        console.log("Error in app.js get method");
        return res.json({Error: err});
    }
}
exports.deleteExpense = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        console.log("Insedddeedddhbfjnd");
        //console.log("Insedddeedddhbfjnd");
        if(!req.params.id){
            throw new Error("Id is mandatory");
        }
    const detailsId = req.params.id;
    const exp = await expense.findOne({
        where:{
            id: detailsId
        }
    })
    console.log(exp);
    console.log(exp.amount);
    const totalExp = Number(req.user.totalExpense) - Number(exp.amount);
    console.log(totalExp);
    const deleted = await expense.destroy({
        where: {
            id:detailsId, 
            userId: req.user.id            
        },
        transaction: transaction
    });
    console.log(deleted);
    console.log(totalExp);
    const updated = await user.update({
        totalExpense: totalExp
    },{
        where:{
            id: req.user.id,
        }
    })
    console.log(updated);
    res.json({msg:"Deleted", success:true});
    await transaction.commit();
    }
    catch(err){
        console.log("Error in delete Method");
        res.json({Error: err});
        await transaction.rollback();
    }
}

// pagination for the expenses//
exports.showNumberExpense = async(req,res,next)=>{
    try{
        const{page,pagesize}=req.query;
        const limits=+pagesize;
        const data=  await expense.findAll({
            offset:(page-1)*pagesize,
            limit:limits,
            where: { userId:req.user.id }
        })
        console.log(data)
        res.json({Data:data})
    }catch(e){
        console.log("pagination error-->",e)
        res.json({Error:e})
    }

}

