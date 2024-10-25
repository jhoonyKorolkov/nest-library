import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentGateway } from './comment.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/comment.shema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
    providers: [CommentService, CommentGateway],
})
export class CommentModule {}
