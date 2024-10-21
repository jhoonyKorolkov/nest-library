import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Status } from '../enum';

export class CreateBookDto {
    @IsString({ message: 'Поле "Название книги" должно быть строкой' })
    @IsNotEmpty({ message: 'Название книги не может быть пустым' })
    name: string;

    @IsString({ message: 'Поле "Автор" должно быть строкой' })
    @IsNotEmpty({ message: 'Автор не может быть пустым' })
    author: string;

    @IsString({ message: 'Поле "Email" должно быть строкой' })
    @IsEmail({}, { message: 'Некорректный адрес электронной почты' })
    email: string;

    @IsOptional()
    @IsEnum(Status, { message: 'Недопустимый статус' })
    status: Status;

    @IsOptional()
    @IsArray({ message: 'Теги должны быть массивом' })
    @ArrayNotEmpty({ message: 'Массив тегов не может быть пустым' })
    @IsString({ each: true, message: 'Каждый тег должен быть строкой' })
    tags?: string[];
}
