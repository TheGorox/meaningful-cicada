const sequelize = require('sequelize');

const User = require('../models/user');
const { emailRegex } = require('../utils');

const logger = require('log4js').getLogger('CTRL:USER');
logger.level = 'debug';

const validator = {
    name: (name) => {
        return name && name.length > 1 && name.length < 15
    },
    surname: (surname) => {
        return surname && surname.length > 1 && surname.length < 25
    },
    email: (email) => {
        return email.test(emailRegex);
    }
}


async function createUser(req, res) {
    logger.debug('createUser');

    const name = req.body.name;
    if (!validator.name(name)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid name'
        });
    }

    const surname = req.body.surname;
    if (!validator.surname(surname)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid surname'
        });
    }

    const email = req.body.email;
    if (!validator.email(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid email'
        });
    }

    try {
        await User.create({
            firstName: name, secondName: surname, email
        });

        return res.json({
            success: true
        });
    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}

async function editUser(req, res) {
    logger.debug('editUser');
}

async function getUsers(req, res) {
    logger.debug('getUsers');
}

module.exports = {
    createUser,
    editUser,
    getUsers
}