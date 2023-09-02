//here we define the table.
const Sequelize = require('sequelize');
const sequelize = require("../util/database");

const expense = sequelize.define("expenses",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    amount:{
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    category:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = expense;//