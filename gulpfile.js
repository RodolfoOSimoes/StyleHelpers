'use strict';


const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');


const SOURCE_PATH = './src/';
const DIST_PATH = './dist/';


let distSourceFile = [
  SOURCE_PATH + 'app.scss'
];
let distDestPath = DIST_PATH;
let distDestFile = 'style-helpers.min.css';
let distDestSourceMapsFile = 'style-helpers.min.css.map';

gulp.task('advanced', () => {
  return gulp
    .src(distSourceFile)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(distDestFile))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(distDestPath));
});


let devSourceFiles = [
  SOURCE_PATH + 'app.scss'
];
let devDestPath = DIST_PATH;
let devDestFile = 'style-helpers.css';
let devDestSourceMapsFile = 'style-helpers.css.map';

gulp.task('basic', () => {
  return gulp
    .src(devSourceFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat(devDestFile))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(devDestPath));
});


gulp.task('build', ['basic', 'advanced']);


gulp.task('default', ['basic']);