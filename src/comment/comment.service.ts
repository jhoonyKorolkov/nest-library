import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.shema';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

    async create(createCommentDto: CreateCommentDto): Promise<CreateCommentDto> {
        const commentData = {
            id: new Date().getTime(),
            ...createCommentDto,
        };
        const newComment = new this.commentModel(commentData);
        return newComment.save();
    }

    async findAll(bookId: number): Promise<CreateCommentDto[]> {
        const allComments = await this.commentModel.find({ bookId: bookId }).exec();
        console.log(allComments);

        return allComments;
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
