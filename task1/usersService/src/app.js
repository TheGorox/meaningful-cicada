require('./config/dotenv');

const express = require('express');

const routes = require('./routes');
const sequelize = require('./config/db');

const logger = require('log4js').getLogger('MAIN');
logger.level = 'info';

const app = express();

// 🐱‍👤
app.disable('x-powered-by');

app.use(express.json());
app.use('/api', routes);

app.listen(process.env.PORT, async () => {
    await sequelize.sync();

    logger.info(`Started at port ${process.env.PORT}`);
});