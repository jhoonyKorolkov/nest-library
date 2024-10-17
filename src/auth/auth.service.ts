import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.shema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) {}

    async register(createUserDto: CreateUserDto): Promise<{ token: string }> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const createdUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });

        const { password, _id, ...rest } = await createdUser.save();

        const payload = { sub: _id, rest };

        const token = this.jwtService.sign(payload);

        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const user = await this.userModel.findOne({ email: loginDto.email });

        if (!user) {
            throw new UnauthorizedException('Пользователь не найден');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Не верный пароль');
        }

        const { password, _id, ...rest } = user;

        const payload = { sub: _id, ...rest };
        const token = this.jwtService.sign(payload);

        return { token };
    }

    async validateUserById(userId: string): Promise<any> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('Пользователь не найден');
        }
        return {
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
        };
    }
}
