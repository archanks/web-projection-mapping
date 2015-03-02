'use strict';

/**
 * Module Dependencies
 */

var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less'),
    open = require('gulp-open'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

/**
 * Process CSS
 */

gulp.task('styles', function () {
  return gulp.src('./assets/less/*.less')
    .pipe(less({}))
    .pipe(minifyCSS({keepBreaks: false}))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

/**
 * Minify JS
 */
gulp.task('scripts', function() {
  gulp.src(['./assets/js/vendor/jquery.js','./assets/js/vendor/bootstrap.js'])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload());
});

/**
 * Nodemon
 */

gulp.task('nodemon', function (cb) {
  livereload.listen();
  var called = false;
  nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    setTimeout(function () {
      if (!called) {
        called = true;
        cb();
      }
    }, 1000);
  })
  .on('restart', function () {
    setTimeout(function () {
      livereload.changed('/');
    }, 1000);
  });
});

/**
 * Open the browser
 */

gulp.task('open', ['nodemon'], function () {
  var options = {
    url: 'http://localhost:3000/'
  };
  // any file or gulp will skip the task
  gulp.src('./views/*.ejs')
  .pipe(open('', options));
});

/**
 * Default
 */

gulp.task('default', ['open', 'styles', 'scripts'], function () {
  gulp.watch('views/*.ejs').on('change', livereload.changed);
  gulp.watch('./assets/*.less', ['styles'], livereload.changed);
});