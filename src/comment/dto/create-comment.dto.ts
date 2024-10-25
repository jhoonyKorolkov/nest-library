import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsNumber()
    @IsNotEmpty()
    id: Number;

    @IsString()
    @IsNotEmpty()
    comment: String;

    @IsNumber()
    @IsNotEmpty()
    bookId: Number;
}
