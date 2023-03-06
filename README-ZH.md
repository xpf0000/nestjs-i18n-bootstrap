<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[英文版-en](README.md) | [中文版-zh](README-ZH.md)

已部署上线的多语言自适应网站https://www.macphpstudy.com的源代码，使用nestjs，nestjs-i18n，hbs，bootstrap等技术栈制作

## 安装

```bash
$ yarn install
```

## 调试运行

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## 构建

```bash
$ yarn run build
```

## 部署

使用PM2运行

```bash
$ cd dist;
$ pm2 start main.js
$ pm2 save
```

使用nginx作为反向代理, nginx url重定向规则:

```bash
location ~* (.*)?$ {
    if (!-f $request_filename){
        proxy_pass http://127.0.0.1:3000;
	}
}
```

## 站点地图sitemap

编辑sitemap.js, 替换成你的url和lang设置

```javascript
const urls = [
  'www.macphpstudy.com',
  'www.phpwebstudy.com',
  'www.phpwebstudy.cn',
];

const langs = ['', 'en/', 'zh/', 'ja/', 'fr/', 'de/', 'ko/'];
```

构建站点地图

```bash
$ yarn run sitemap
```

## 项目信息

- Author - [xpf0000](https://github.com/xpf0000)
- Website - [https://www.macphpstudy.com](https://www.macphpstudy.com)
- Twitter - [@xpf0000](https://twitter.com/xpf0000)

## 开源许可证

Nest is [MIT licensed](LICENSE).
