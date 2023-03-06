import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  I18nModule,
  AcceptLanguageResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { AppLangController } from './app.lang.controller';

const DefaultLan = 'zh';

const I18n = I18nModule.forRoot({
  fallbackLanguage: DefaultLan,
  loaderOptions: {
    path: join(__dirname, '/i18n/'),
    watch: true,
  },
  viewEngine: 'hbs',
  resolvers: [new HeaderResolver(['x-custom-lang']), AcceptLanguageResolver],
});

@Module({
  imports: [I18n],
  controllers: [AppController, AppLangController],
  providers: [AppService],
})
export class AppModule {}
