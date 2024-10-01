import { Injectable } from '@nestjs/common';
import { IBook } from './interfaces/books.interface';

@Injectable()
export class BooksService {
  private books: IBook[] = [{ name: 'newBook', author: 'john' }];

  findAll(): IBook[] {
    return this.books;
  }
}
