import { Body, Controller, Post, Request, UseGuards, UsePipes } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ValidationCustomPipe } from '../pipes/validate.cutom.pipe';

@UsePipes(ValidationCustomPipe)
@Controller()
export class AuthController {
    constructor(private authServise: AuthService) {}

    @Post('/signup')
    async signup(@Body() createuserDto: CreateUserDto) {
        return this.authServise.register(createuserDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return this.authServise.login(loginDto);
    }
}
