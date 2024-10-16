import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const contextData = {
            className: context.getClass().name,
            handler: context.getHandler().name,
        };

        return next.handle().pipe(
            map(data => ({
                status: 'success',
                data: data,
                context: contextData,
            })),
            catchError(err => {
                let errorResponse = err;

                if (err.getStatus && err.getResponse) {
                    errorResponse = err.getResponse();
                }

                return throwError(() => ({
                    status: 'fail',
                    data: errorResponse,
                    context: contextData,
                }));
            })
        );
    }
}
