import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());

    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API documentation for the project')
        .setVersion('1.0')
        .addServer(`http://localhost:3000`)
        .addServer(`http://1212.ru`)
        .addTag('localhost') // можно добавить теги для группировки
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(3000);
}
bootstrap();
