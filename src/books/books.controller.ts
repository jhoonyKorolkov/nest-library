import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';

import { LoggerInterceptor } from './interceptor/logger.interceptor';
import { ValidationCustomPipe } from '../pipes/validate.cutom.pipe';
import { ValidateIdPipe } from '../pipes/validate.id.pipe';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('book')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @UsePipes(ValidationCustomPipe)
    @Post()
    create(@Body() body: CreateBookDto): Promise<Book> {
        return this.booksService.create(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @UseInterceptors(LoggerInterceptor)
    @Get(':id')
    findBook(@Param('id', ValidateIdPipe) id: string): Promise<Book> {
        return this.booksService.findBook(id);
    }

    @Put(':id')
    updateBook(@Param('id') id: string, @Body() body: CreateBookDto): Promise<Book> {
        return this.booksService.updateBook(id, body);
    }

    @Delete(':id')
    deleteBook(@Param('id') id: string) {
        return this.booksService.deleteBook(id);
    }
}
