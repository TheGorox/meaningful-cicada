const Sequelize = require('sequelize');

const sequelize = require('../config/db');

const History = sequelize.define('History', {
    uid: {
        // integer-а достаточно чтобы покрыть нужды SERIAL
        type: Sequelize.INTEGER,
        allowNull: false
    },

    type: {
        type: Sequelize.ENUM,
        values: ['create', 'edit'],
        allowNull: false
    },

    changeData: {
        // изменённых полей может быть несколько, предполагая
        // что история нужна только для чтения, удобнее будет сделать объединённое поле
        type: Sequelize.JSON,
        allowNull: true
    }
});

History.sync();

module.exports = History;