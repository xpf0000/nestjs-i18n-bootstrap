import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import AppGlobal from './app.global';

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception instanceof NotFoundException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      response.render('404', {
        path: 'index.html',
        headArgs: {
          SiteUrl: AppGlobal.SiteUrl,
          PageTitle: '',
          PageKeywords: '',
          PageDescription: '',
        },
      });
    }
  }
}

export default new HttpExceptionFilter();
