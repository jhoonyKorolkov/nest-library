import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [
        AuthModule,
        BooksModule,
        CommentModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_CONNECTION'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
