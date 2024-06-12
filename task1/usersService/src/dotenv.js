// модуль для активации .env файла по всему окружению
const path = require('node:path');

const logger = require('log4js').getLogger('DOTENV');
logger.level = 'warn';

try {
    const dotenv = require('dotenv');
    
    const envFilePath = path.join(__dirname, '.env');
    dotenv.config({
        path: envFilePath
    });
} catch (error) {
    logger.error(error);
    logger.warn('^^^ Failed to load dotenv');
}