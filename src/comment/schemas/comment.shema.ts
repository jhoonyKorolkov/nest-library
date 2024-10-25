import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ versionKey: false })
export class Comment {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    bookId: number;

    @Prop({ required: true })
    comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
