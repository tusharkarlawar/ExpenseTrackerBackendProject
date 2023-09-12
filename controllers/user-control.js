const expense = require("../models/expense");
const user = require("../models/user"); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const RazorPay = require('razorpay');
const order = require("../models/orders");
const sequelize = require("../util/database");
require('dotenv').config();

exports.addUser = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        const name = req.body.name;
        const email = req.body.email;
        const checkemail = req.body.email;
        const password = req.body.password;
        let totalExpense = 0;
        if(password.length<5){
            return(res.json({msg:"password should atleast contain 5 letters",
        success: false}));
        }
        bcrypt.hash(password, 5, async(error, hash)=>{
            if(error){
                return res.json({msg:"Encryption error", success:false});
            }else{
                const found = await user.findAll({
                    where:{
                        email: checkemail
                    }
                })
                if(found.length != 0){
                    res.json({msg:"User Already exists!! Please enter a different email", success:false});
                }else{
                    const data = await user.create({
                    name:name,
                    email:email,
                    password:hash,
                    totalExpense:totalExpense
                },{
                    transaction: transaction
                })
                res.json({newUser: data, msg:"User created", success: true});
                await transaction.commit();
            }    
            }

        })
    }
    catch(err){
        res.json({
            Error: err
        })
        await  transaction.rollback();
    }

}



function generateAccessToken(id, isPremium){
    return jwt.sign({userId: id, isPremium}, process.env.SECRET_KEY) //generate token//stateless
}

exports.userLogin = async(req,res,next)=>{
    const transaction = await sequelize.transaction();
    try{
        const checkEmails = req.body.email;
        const checkPassword = req.body.password;
        console.log(checkEmails);
        const login = await user.findAll({
            where:{
                email:checkEmails
            }
        },{
            transaction: transaction
        })
        console.log(login[0]);
        if(login.length>0){
            bcrypt.compare(checkPassword, login[0].password, async(err, result)=>{
                if(err){
                    return(res.json({msg:"dcrypting error",
                    success:false}))
                }
                //console.log(result);
                if(result===true){
                    return(
                        res.json({msg:"Password is correct",
                    success:true, token: generateAccessToken(login[0].id, login[0].isPremium)}
                    ))
                }else{
                    return(res.json({msg:"Password is incorrect",
                    success:false}))
                }
            })
        }
        else{
                return(res.json("User doesnt exist"));
            }
            
    }
    catch(error){
        res.json({Error: error});
        await transaction.rollback();
    }
}
