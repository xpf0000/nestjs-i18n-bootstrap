import { Controller, Get, Render } from '@nestjs/common';
import { AppController } from './app.controller';

@Controller(':lang')
export class AppLangController extends AppController {}
