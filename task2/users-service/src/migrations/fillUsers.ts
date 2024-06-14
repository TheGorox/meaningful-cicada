/*
 * Дропает и заполняет таблицу Users случайными пользователями (1000000 штук)
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/models/user.model';

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

function randint(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}
function randstr(length: number, capitalize: boolean = true): string {
    const ab = 'abcdefghijklmnopqrstuvwxyz';
    let randStr = Array.from({ length }, () => ab[randint(0, ab.length)]);

    if (capitalize) randStr[0] = randStr[0].toUpperCase();

    return randStr.join('');
}

async function fillUsers(): Promise<void> {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,

        models: [User],
        logging: false,
        // лучше отключить логи :)
    });

    await sequelize.sync();

    // ДРОПАЕТ таблицу!!!
    await User.sync({ force: true });

    // будем заполнять частями
    const batchSize = 100_000;

    for (let i = 0; i < 1_000_000; i += batchSize) {
        console.log(`Done [${i}/1_000_000]`)

        const randUsers = Array.from({ length: batchSize }, () => {
            const todayIsRainyDay = Math.random() < 0.5;
            const pigsCanFlyToday = Math.random() < 0.5;

            return {
                firstName: randstr(10),
                lastName: randstr(14),
                age: Math.floor(Math.random() * 100),
                sex: todayIsRainyDay ? 'M' : 'F',
                problems: pigsCanFlyToday ? true : false,
            }
        });

        await User.bulkCreate(randUsers);
    }

    console.log('All done!');
}
fillUsers();