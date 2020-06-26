const gulp = require('gulp');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const htmlValidator = require('gulp-w3c-html-validator');
const bemValidator = require('gulp-html-bem-validator');

module.exports = function html(cb) {
  return gulp
    .src('source/*.html')
    .pipe(posthtml([include()]))
    .pipe(htmlValidator())
    .pipe(bemValidator())
    .pipe(gulp.dest('build'));
};
