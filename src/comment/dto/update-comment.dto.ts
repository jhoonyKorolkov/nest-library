import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsString()
    @IsNotEmpty()
    comment?: String;
}
