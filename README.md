<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[英文版-en](README.md) | [中文版-zh](README-ZH.md)

<p>
Source code for an online multilingual adaptive website <a href="https://www.macphpstudy.com" target="_blank">https://www.macphpstudy.com</a>, using nestjs, nestjs-i18n, hbs, bootstrap
</p>

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Build

```bash
$ yarn run build
```

## Deploy

Running with PM2

```bash
$ cd dist;
$ pm2 start main.js
$ pm2 save
```

Using nginx as a reverse proxy, nginx url rewrite rule:

```bash
location ~* (.*)?$ {
    if (!-f $request_filename){
        proxy_pass http://127.0.0.1:3000;
	}
}
```

## SiteMap

Edit sitemap.js, replace with your's url and lang set

```javascript
const urls = [
  'www.macphpstudy.com',
  'www.phpwebstudy.com',
  'www.phpwebstudy.cn',
];

const langs = ['', 'en/', 'zh/', 'ja/', 'fr/', 'de/', 'ko/'];
```

then build sitemap

```bash
$ yarn run sitemap
```

## Stay in touch

- Author - [xpf0000](https://github.com/xpf0000)
- Website - [https://www.macphpstudy.com](https://www.macphpstudy.com)
- Twitter - [@xpf0000](https://twitter.com/xpf0000)

## License

Nest is [MIT licensed](LICENSE).
