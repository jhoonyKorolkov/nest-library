import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';

@Controller('book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() body: BookDto): Promise<Book> {
    return this.booksService.create(body);
  }

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() body: BookDto): Promise<Book> {
    return this.booksService.updateBook(id, body);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
