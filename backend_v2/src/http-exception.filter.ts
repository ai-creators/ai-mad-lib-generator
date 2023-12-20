import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorMessage } from './models/messages';

const errorMessages = {
  404: 'Not Found',
  500: 'Internal server error',
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response<ErrorMessage>>();
    const status = exception.getStatus();

    const message =
      exception.message || errorMessages[status] || 'Internal server error';

    response.status(status).json({
      message,
    });
  }
}
