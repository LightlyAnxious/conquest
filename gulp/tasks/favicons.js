const gulp = require('gulp');
const favicons = require('gulp-favicons');

module.exports = function renderFavicons() {
  return gulp
    .src('source/img/favicons/*.png')
    .pipe(
      favicons({
        appName: 'Conquest',
        appShortName: '',
        appDescription: 'Conquest - часы премиум брендов',
        developerName: 'Даниил Приходько',
        developerURL: 'http://https://github.com/LightlyAnxious',
        background: '#020307',
        path: '',
        url: 'http://https://github.com/LightlyAnxious',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/?homescreen=1',
        version: 1.0,
        logging: false,
        html: 'index.html',
        pipeHTML: true,
        replace: true,
        icons: {
          appleIcon: false,
          appleStartup: false
        }
      })
    )
    .pipe(gulp.dest('build/favicons'));
};
