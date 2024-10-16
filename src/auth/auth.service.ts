import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.shema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) {}

    async register(createUserDto: CreateUserDto): Promise<{ token: string }> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const createdUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });

        const { password, ...payload } = await createdUser.save();

        const token = this.jwtService.sign(payload);

        return { token };
    }

    async validateUserById(userId: string): Promise<any> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return {
            userId: user._id,
            email: user.email,
            firstName: user.firstName,
        };
    }
}
