'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    ggcmq  = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    sassPath = {
        scss : '../css/*.scss',
        css : '../css/',
        partials : '../css/partials/**/*.{scss,css}'
    };
    
gulp.task('sass', function () {
  return gulp.src(sassPath.scss)
    .pipe(sourcemaps.init())
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
    .pipe(sourcemaps.write(sassPath.css))
    .pipe(gulp.dest(sassPath.css));
});
 
gulp.task('default', function () {
  gulp.watch([sassPath.partials, sassPath.scss], ['sass']);
});
