import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BooksModule } from '../src/books/books.module';
import { BooksService } from '../src/books/books.service';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from '../src/books/schemas/book.schema';
import { JwtAuthGuard } from '../src/auth/auth.guard';

describe('Books', () => {
    let app: INestApplication;
    let bookService = { findAll: jest.fn(() => [{ id: 1, name: 'Test Book' }]) };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [BooksModule],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue(jest.fn())
            .overrideProvider(BooksService)
            .useValue(bookService)
            .overrideProvider(getModelToken(Book.name))
            .useValue(jest.fn())

            .compile();
        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET book`, () => {
        return request(app.getHttpServer()).get('/book').expect(200).expect(bookService.findAll());
    });

    afterAll(async () => {
        await app.close();
    });
});
