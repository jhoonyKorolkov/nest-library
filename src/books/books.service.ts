import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

    async create(data: CreateBookDto): Promise<BookDocument> {
        const bookData = {
            id: new Date().getTime(),
            ...data,
        };

        const book = new this.bookModel(bookData);
        return await book.save();
    }

    async findAll(): Promise<BookDocument[]> {
        const allBooks = await this.bookModel.find().exec();
        return allBooks;
    }

    async findBook(id: string): Promise<BookDocument> {
        const book = await this.bookModel.findById({ _id: id }).exec();
        return book;
    }

    async updateBook(id: string, data: CreateBookDto): Promise<BookDocument> {
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
