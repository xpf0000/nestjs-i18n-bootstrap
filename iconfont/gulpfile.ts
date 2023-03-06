// 执行方式:  gulp Iconfont
const async = require('async');
const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
// 打包全部字体
const svgs = ['./svg/*.svg'];

// 打包特定字体
// const svgs = [
//   './svg/addons.svg',
//   './svg/clean.svg'
// ]

// 字体className
const fontName = 'x-icon';
// 输出格式
const formats = ['ttf', 'eot', 'woff', 'woff2'];

gulp.task('Iconfont', function (done) {
  const iconStream = gulp.src(svgs).pipe(
    iconfont({
      fontName: fontName,
      formats: formats,
    }),
  );
  async.parallel(
    [
      function handleGlyphs(cb) {
        iconStream.on('glyphs', function (glyphs, options) {
          console.log('glyphs: ', glyphs);
          gulp
            .src('./iconfont.css')
            .pipe(
              consolidate('lodash', {
                glyphs: glyphs,
                fontName: fontName,
                fontPath: './fonts/',
                className: fontName,
              }),
            )
            .pipe(gulp.dest('./dist'))
            .on('finish', cb);
        });
      },
      function handleFonts(cb) {
        iconStream.pipe(gulp.dest('./dist/fonts/')).on('finish', cb);
      },
    ],
    done,
  );
});
