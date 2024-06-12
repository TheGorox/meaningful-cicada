// модуль для активации .env файла по всему окружению
const path = require('node:path');
const fs = require('node:fs');

const logger = require('log4js').getLogger('DOTENV');
logger.level = 'warn';

try {
    const dotenv = require('dotenv');

    const envConfig = dotenv.parse(fs.readFileSync(path.join(__dirname, '../.env')));
    for (var k in envConfig) {
        process.env[k] = envConfig[k];
    }
} catch (error) {
    logger.error(error);
    logger.warn('^^^ Failed to load dotenv');
}