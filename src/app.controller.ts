import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import AppGlobal from './app.global';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root(@I18n() i18n: I18nContext) {
    return {
      path: 'index.html',
      headArgs: {
        SiteUrl: AppGlobal.SiteUrl,
        PageTitle: '',
        PageKeywords: '',
        PageDescription: '',
      },
    };
  }

  @Get('index.html')
  @Render('index')
  index(@I18n() i18n: I18nContext) {
    return {
      path: 'index.html',
      headArgs: {
        SiteUrl: AppGlobal.SiteUrl,
        PageTitle: '',
        PageKeywords: '',
        PageDescription: '',
      },
    };
  }

  @Get('download.html')
  @Render('download')
  download(@I18n() i18n: I18nContext) {
    const pre = i18n.t('download.text1') + ', ';
    return {
      path: 'download.html',
      headArgs: {
        SiteUrl: AppGlobal.SiteUrl,
        PageTitle: pre,
        PageKeywords: pre,
        PageDescription: pre,
      },
    };
  }

  docRes(i18n: I18nContext, i: number, j: number) {
    const pre = i18n.t(`doc${i}${j}.title`) + ', ';
    const res = {
      path: `help-${i}-${j}.html`,
      active: {},
      headArgs: {
        SiteUrl: AppGlobal.SiteUrl,
        PageTitle: pre,
        PageKeywords: pre,
        PageDescription: pre,
      },
    };
    res.active[`help_${i}_${j}`] = 'active';
    return res;
  }

  @Get('help-:i-:j.html')
  help_doc(@Param() params, @Res() res: Response, @I18n() i18n: I18nContext) {
    const data = this.docRes(i18n, params.i, params.j);
    return res.render(`help_${params.i}_${params.j}`, data);
  }

  @Get('about.html')
  @Render('about')
  about(@I18n() i18n: I18nContext) {
    const pre = i18n.t('about.title') + ', ';
    return {
      path: 'about.html',
      headArgs: {
        SiteUrl: AppGlobal.SiteUrl,
        PageTitle: pre,
        PageKeywords: pre,
        PageDescription: pre,
      },
    };
  }
}
