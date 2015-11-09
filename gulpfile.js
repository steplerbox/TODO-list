var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('default', ['scripts', 'styles', 'html']);

gulp.task('scripts', function () {
    return browserify({
            entries: ['./src/js/app.js'],
            transform: [reactify],
//           debug: true // Gives sourcemapping
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', function () {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(concat('bundle.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
    return gulp.src('./src/index.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('./dist/'));
});