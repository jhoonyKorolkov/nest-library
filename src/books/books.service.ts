import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { BookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(data: BookDto): Promise<BookDocument> {
    const book = new this.bookModel(data);
    return await book.save();
  }

  async findAll(): Promise<BookDocument[]> {
    const allBooks = await this.bookModel.find().exec();
    return allBooks;
  }

  async updateBook(id: string, data: BookDto): Promise<BookDocument> {
    const updatedBook = await this.bookModel
      .findOneAndUpdate({ _id: id }, data, {
        new: true,
      })
      .exec();
    return updatedBook;
  }

  async deleteBook(id: string): Promise<BookDocument> {
    const deletedBook = await this.bookModel
      .findByIdAndDelete({
        _id: id,
      })
      .exec();
    return deletedBook;
  }
}
