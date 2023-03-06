import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import * as hbs from 'hbs';
import AppGlobal from './app.global';
import AppErrorFilter from './app.error.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve(__dirname, '../', 'public'));
  app.setBaseViewsDir(resolve(__dirname, '../', `views`));
  hbs.registerPartials(resolve(__dirname, '../', `views/components`));
  app.engine('html', hbs.__express);
  app.setViewEngine('html');
  app.use((req, res, next) => {
    const lange = req.path
      .split('/')
      .filter((s) => s.trim().length > 0)
      .shift();
    if (lange) {
      AppGlobal.lang = lange;
    } else {
      AppGlobal.lang = req.acceptsLanguages('zh', 'en', 'de', 'ja', 'fr', 'ko');
    }
    req.headers['x-custom-lang'] = AppGlobal.lang;
    next();
  });
  app.useGlobalFilters(AppErrorFilter);
  await app.listen(3000);
}
bootstrap().then();
