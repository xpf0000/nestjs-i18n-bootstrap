const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');

const releaseDir = path.resolve(__dirname, './sitemap');
if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir);
}

function getAllFile(fp, fullpath = true) {
  let arr = [];
  if (!fs.existsSync(fp)) {
    return arr;
  }
  if (fs.statSync(fp).isFile()) {
    return [fp];
  }
  let files = fs.readdirSync(fp);
  files.forEach(function (item) {
    let fPath = path.join(fp, item);
    let stat = fs.statSync(fPath);
    if (stat.isDirectory()) {
      let sub = getAllFile(fPath, fullpath);
      arr = arr.concat(sub);
    }
    if (stat.isFile()) {
      arr.push(fullpath ? fPath : item);
    }
  });
  return arr;
}

const urls = [
  'www.macphpstudy.com',
  'www.phpwebstudy.com',
  'www.phpwebstudy.cn',
];

const langs = ['', 'en/', 'zh/', 'ja/', 'fr/', 'de/', 'ko/'];

const all = getAllFile(path.resolve(__dirname, './views'))
  .filter((s) => !s.includes('components') && !s.includes('404'))
  .map((s) => {
    return path.basename(s.replace(new RegExp('_', 'g'), '-'));
  });

const now = DateTime.now();

urls.forEach((url) => {
  const urlDir = path.join(releaseDir, url);
  if (!fs.existsSync(urlDir)) {
    fs.mkdirSync(urlDir);
  }
  const allUrl = [];
  const allUrlXML = [];
  const allUrlXMLBaidu = [];
  langs.forEach((lang) => {
    all.forEach((file) => {
      const p = `https://${url}/${lang}${file}`;
      console.log(p);
      allUrl.push(p);

      const timeISO = now.toISO();

      const xml = `<url>
    <loc>${p}</loc>
    <lastmod>${timeISO}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
</url>`;
      allUrlXML.push(xml);
      allUrlXMLBaidu.push(xml);

      const xmlBaidu = `<url>
    <loc>${p}</loc>
    <mobile:mobile type="pc,mobile"/>
    <lastmod>${timeISO}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
</url>`;
      allUrlXMLBaidu.push(xmlBaidu);
    });
  });
  const txtPath = path.join(urlDir, `sitemap.txt`);
  fs.writeFileSync(txtPath, allUrl.join('\n'));

  allUrlXML.unshift(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);
  allUrlXML.push('</urlset>');

  allUrlXMLBaidu.unshift(`<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.baidu.com/schemas/sitemap-mobile/1/">`);
  allUrlXMLBaidu.push('</urlset>');

  const xmlPath = path.join(urlDir, `sitemap.xml`);
  fs.writeFileSync(xmlPath, allUrlXML.join('\n'));

  const xmlBaiduPath = path.join(urlDir, `sitemap_baidu.xml`);
  fs.writeFileSync(xmlBaiduPath, allUrlXMLBaidu.join('\n'));
});
