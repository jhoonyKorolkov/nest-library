/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authServise: AuthService) {}

    @Post('signup')
    async signup(@Body() createuserDto: CreateUserDto) {
        return this.authServise.register(createuserDto);
    }
    // async register(@Body() createUserDto: CreateUserDto) {
    //   return this.authService.register(createUserDto);
    // }
}
