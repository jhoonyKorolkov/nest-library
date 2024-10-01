import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';
import { IBook } from './interfaces/books.interface';

@Controller('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): IBook[] {
    return this.booksService.findAll();
  }
}
