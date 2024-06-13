const logger = require('log4js').getLogger('CTRL:HISTORY');

const History = require('../models/history');

const validator = {
    // id должен быть десериализован до проверки
    id: (id) => {
        return !isNaN(id) && id >= 0 && id <= 2147483647 // postgres serial minmax
    },

    entryType: (t) => t === 'CREATE' || t === 'EDIT'
}

async function getHistory(req, res){
    const id = req.params.id;
    if(!validator.id(id)){
        return res.status(400).json({
            success: false,
            error: 'Invalid user id'
        });
    }

    const limit = +req.query.limit;
    if(isNaN(limit) || limit < 1 || limit > 99){
        return res.status(400).json({
            success: false,
            error: 'Invalid limit'
        });
    }
    const offset = +req.query.offset || 0;
    if(isNaN(offset) || offset < 0){
        return res.status(400).json({
            success: false,
            error: 'Invalid offset'
        });
    }

    try {
        const foundData = await History.findAll({
            where: {
                uid: id
            },

            limit, // благодаря sequelize, работает из коробки
            offset,

            // createdAt создаётся автоматически sequelize-ом, так почему бы не воспользоваться
            order: [['createdAt', 'DESC']]
        });

        const entriesMapped = foundData.map(history => {
            return {
                uid: history.uid,
                event: history.type,
                eventData: history.changeData,
                date: history.createdAt
            }
        })

        res.json(entriesMapped);
    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}

async function pushHistory(req, res){
    const id = req.body.userId;
    if(!validator.id(id)){
        return res.status(400).json({
            success: false,
            error: 'Invalid user id'
        });
    }

    const entryType = req.body.event;
    if(!validator.entryType(entryType)){
        return res.status(400).json({
            success: false,
            error: 'Invalid entry type'
        });
    }

    // не будем валидировать данные изменений пока что
    const eventData = req.body.eventData;

    try {
        await History.create({
            uid: id,
            type: entryType.toLowerCase(),
            changeData: eventData
        });
    } catch (error) {
        logger.error(error);

        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }

    res.json({
        success: true
    });
}

module.exports = {
    getHistory,
    pushHistory
}
