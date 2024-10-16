import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
    @IsString({ message: 'Поле "Email" должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный адрес электронной почты' })
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    email: string;

    @IsString({ message: 'Поле "Пароль" должно быть строкой' })
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    @MinLength(6, { message: 'Поле пароль должны содержать минимум 6 символов' })
    password: string;
}
