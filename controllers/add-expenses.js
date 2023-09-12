//here we add, get and deleted the expense//
const expense = require("../models/expense");
const user = require("../models/user"); 
const sequelize = require("../util/database");
require('dotenv').config();

exports.addExpenses = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        const {description,amount,category} = req.body
        console.log(description, amount);
        let totalExpense=0;
        console.log(req.user)
        const data = await req.user.createExpense({
            description,
            amount,
            category,
        },
        {transaction: transaction})
        totalExpense = Number(req.user.totalExpense)+ Number(amount);
        await req.user.update({totalExpense:totalExpense},
        {
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
        const data = await req.user.getExpenses()
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
        if(!req.params.id){
            throw new Error("Id is mandatory");
        }
    const detailsId = req.params.id;
    const expenses = await req.user.getExpenses({where:{id: detailsId}})  //array of object
    const exp = expenses[0];
    console.log(exp.amount);
    const totalExp = Number(req.user.totalExpense) - Number(exp.amount);
    console.log(totalExp);

    const deleted = await exp.destroy({transaction: transaction});
    
    const updated = await req.user.update({
        totalExpense: totalExp
    },{transaction: transaction})
    
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
        const data=  await req.user.getExpenses({
            offset:(page-1)*pagesize, //skip the pages
            limit:limits,
        })
        console.log(data)
        res.json({Data:data})
    }catch(e){
        console.log("pagination error-->",e)
        res.json({Error:e})
    }
}

