const Sequelize = require('sequelize');
const sequelize = require("../util/database");

const download = sequelize.define("downloadFile",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    fileUrl:{
        type: Sequelize.STRING
    }
});

module.exports = download;//