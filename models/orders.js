//here we define the table.
const Sequelize = require('sequelize');
const sequelize = require("../util/database");

const order = sequelize.define("orders",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    paymentid: Sequelize.STRING,
    orderid: Sequelize.STRING,
    status: Sequelize.STRING
})

module.exports = order;//