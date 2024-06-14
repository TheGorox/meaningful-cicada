import { Controller, Inject, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/unmarkProblems')
    async unmarkProblems(): Promise<{ count: number }> {
        const count = await this.usersService.unmarkProblems();

        return {
            count
        }
    }
}