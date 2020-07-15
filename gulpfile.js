const gulp = require('gulp');

const styles = require('./gulp/tasks/styles');
const clean = require('./gulp/tasks/clean');
const html = require('./gulp/tasks/html');
const fonts = require('./gulp/tasks/fonts');
const images = require('./gulp/tasks/images');
const webp = require('./gulp/tasks/webp');
const sprite = require('./gulp/tasks/sprite');
const script = require('./gulp/tasks/script');
const sync = require('./gulp/tasks/server');
const favicons = require('./gulp/tasks/favicons');
const lighthouse = require('./gulp/tasks/lighthouse');

function setMode(isProd = false) {
  return cb => {
    process.env.NODE_ENV = isProd ? 'production' : 'development';
    cb();
  };
}

module.exports.styles = gulp.series(styles);
module.exports.clean = gulp.series(clean);
module.exports.html = gulp.series(html);
module.exports.fonts = gulp.series(fonts);
module.exports.images = gulp.series(images);
module.exports.webp = gulp.series(webp);
module.exports.sprite = gulp.series(sprite);
module.exports.script = gulp.series(script);
module.exports.icons = gulp.series(favicons);
module.exports.lighthouse = gulp.series(lighthouse);

const build = gulp.series(
  clean,
  favicons,
  html,
  styles,
  script,
  fonts,
  images,
  webp,
  sprite
);

module.exports.start = gulp.series(setMode(), sync);
module.exports.build = gulp.series(setMode(true), build);
