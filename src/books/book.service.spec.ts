import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { Status } from './enum';

describe('BooksService', () => {
    let bookService: BooksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BooksService,
                {
                    provide: getModelToken(Book.name),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        findOneAndUpdate: jest.fn(),
                        findOneAndDelete: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        bookService = module.get<BooksService>(BooksService);
    });

    it('create - должен создавать книгу', async () => {
        const createBookDto: CreateBookDto = {
            name: 'test',
            author: 'test',
            email: 'sas',
            status: Status.CREATED,
            tags: ['12', '21'],
        };

        const createdBook = {
            _id: '1234',
            name: 'test',
            author: 'test',
            email: 'sas',
            status: Status.CREATED,
            tags: ['12', '21'],
            __v: 0,
        } as unknown as BookDocument;

        jest.spyOn(bookService, 'create').mockResolvedValue(createdBook);

        const result = await bookService.create(createBookDto);

        expect(result).toEqual(createdBook);
    });
});
