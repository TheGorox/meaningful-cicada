const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
});

module.exports = User;