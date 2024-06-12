const sequelize = require('sequelize');

const User = require('../models/user');
const { emailRegex, getChangedProps } = require('../utils');
const { pushHistory } = require('../historyApi');

const logger = require('log4js').getLogger('CTRL:USER');
logger.level = 'debug';

// валидатор для того, чтобы сильно не повторять код валидации
// возможно для тестового задания излишне, но почему бы и нет
const validator = {
    name: (name) => {
        return name && name.length > 1 && name.length < 15
    },
    surname: (surname) => {
        return surname && surname.length > 1 && surname.length < 25
    },
    email: (email) => {
        return email.test(emailRegex);
    },
    // id должен быть десериализован до проверки
    id: (id) => {
        return !isNaN(id) && id >= 0 && id <= 2147483647 // postgres serial minmax
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
        // создаём пользователя
        const user = await User.create({
            firstName: name, lastName: surname, email
        });

        // успешно запушить историю не обязательно для успешного запроса (?)
        try {
            // логгируем создание в историю
            await pushHistory('CREATE', user.id, null);
        } catch (error) {
            logger.error(error);
            logger.warn('^^^ Error while pushing user CREATE');
        }

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

    const uid = +req.params.id;
    if(!validator.id(uid)){
        return res.status(400).json({
            success: false,
            error: 'Invalid user id'
        });
    }

    try {
        const user = await User.findByPk(uid);
        if(!user){
            return res.status(404).json({
                success: false,
                error: 'User not found!'
            });
        }

        const newUserValues = {
            firstName: name,
            lastName: surname,
            email
        }

        const updatedProps = getChangedProps(user, newUserValues, ['firstName', 'lastName', 'email']);
        if(!updatedProps.length){
            logger.warn(`User (id${user.id}) on update, but nothing changed`);

            return res.json({
                success: true
            });
        }

        // пока не обновили, создадим объект для истории [{key,oldValue,newValue}...]
        const historyData = updatedProps.map(prop => {
            return {
                key: prop,
                oldValue: user[prop],
                newValue: newUserValues[prop]
            }
        });

        await user.update(newUserValues);

        // запушим историю уже после обновления
        try {
            await pushHistory('EDIT', user.id, historyData);
        } catch (error) {
            logger.error(error);
            logger.warn('^^^ Error while pushing user EDIT');
        }

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

// TODO: кешировать список на проде
async function getUsers(req, res) {
    logger.debug('getUsers');

    try {
        const users = await User.findAll();
        // конвертируем в объекты и форматируем
        const usersFormatted = users.map(user => {
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });   

        return res.json({
            success: true,
            users: usersFormatted
        })
    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
}

module.exports = {
    createUser,
    editUser,
    getUsers
}