import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User
    ) { }

    async unmarkProblems(): Promise<number> {
        // можно было сделать всё одним запросом,
        // сырым query вида 
        // with xxx as ( update ... returning 1 ) select count(*) ...
        // но это не sequelize путь
        const count = await this.userModel.count({
            where: { problems: true }
        });
        await this.userModel.update({
            problems: false
        }, {
            where: { problems: true }
        });

        return count
    }
}
