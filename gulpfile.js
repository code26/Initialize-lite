'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    wait = require('gulp-wait'),
    ggcmq  = require('gulp-group-css-media-queries'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    sassPath = {
         scss : '../css/*.scss',
        css : '../css/',
        partials : '../css/partials/'
    };

gulp.task('sass:compile', function () {
  return gulp.src(sassPath.scss)
    .pipe(wait(500)) //wait for 500ms. adjust as needed.
    .pipe(sourcemaps.init())
    .pipe(sass({
        //outputStyle: 'compressed',
        noCache: true,
        errLogToConsole: true,
        includePaths: sassPath.partials // no need to add 'partials/' when importing
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
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(sassPath.css));
});

gulp.task('default', function () {
  gulp.watch([sassPath.partials + '**/*.{scss,css}', sassPath.scss], ['sass:compile']);
});
