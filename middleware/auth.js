const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async(req, res, next)=>{
    try{
        const token = req.header('Authorization');
        console.log(token);
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("User ID>>>>>>>>>>>>>>>>>", decoded.userId);
        const user = await User.findByPk(decoded.userId)
            req.user = user;  //return user deatails
            
            next(); //function to pass control to the next middleware or route handler
            
    }
    catch(error){
        console.log(error);
        return res.status(401).json({sucess: false});
    }
}
//exports
module.exports = {
    authenticate
}