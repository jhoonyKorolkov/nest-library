import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ versionKey: false })
export class Book {
  @Prop({ required: true })
  name: string;
  @Prop()
  author: string;
  @Prop()
  tags: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
