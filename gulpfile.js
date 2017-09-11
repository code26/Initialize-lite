'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var ggcmq  = require('gulp-group-css-media-queries');
var autoprefixer = require('gulp-autoprefixer');

var sassPath = {
    src : 'res/scss/**/*.scss',
    dist : 'dist/'
}

var cssPath = 'dist/app.css';
 
gulp.task('sass', function () {
  return gulp.src(sassPath.src)
    .pipe(sass({
        outputStyle: 'compressed', 
        errLogToConsole: true
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: [
            'last 2 versions',
            'ie >= 10',
            'ie_mob >= 10',
            'ff >= 30',
            'chrome >= 34',
            'safari >= 7',
            'opera >= 23',
            'ios >= 7',
            'android >= 4.4',
            'bb >= 10'
        ]
    }))
    .pipe(ggcmq({
        log: true
    }))
    .pipe(gulp.dest(sassPath.dist));
});
 
gulp.task('default', function () {
  gulp.watch(sassPath.src, ['sass']);
});