const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_TOKEN);

module.exports = sequelize