//here we define the table.
const Sequelize = require('sequelize');
const sequelize = require("../util/database");

const user = sequelize.define("users",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    isPremium:{
        type: Sequelize.BOOLEAN
    },
    totalExpense:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

module.exports = user;//