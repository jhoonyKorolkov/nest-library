import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Status } from '../enum';

export type BookDocument = HydratedDocument<Book>;

@Schema({ versionKey: false })
export class Book {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true })
    email?: string;

    @Prop({ enum: Status, default: Status.CREATED }) // Замените на реальное значение по умолчанию
    status?: Status;

    @Prop({ type: [String], required: false })
    tags?: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
