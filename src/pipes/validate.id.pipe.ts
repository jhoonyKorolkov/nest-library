import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(value);

        // тут удалось получить ошибку только если проверять на существцющий id value !== '670dff52599a264246c0a42c'
        if (value !== '670dff52599a264246c0a42c') {
            throw new BadRequestException(`Параметр "${metadata.data}" не должен быть пустым`);
        }
        return value;
    }
}
