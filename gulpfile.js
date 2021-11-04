const gulp = require('gulp');
const cssnano = require('cssnano');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const webp = require('gulp-webp');
// const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
// const terser = require('gulp-terser')
//postcss
// const postImport = require('postcss-import');
// const postNesting = require('postcss-nested');

function gulp_css() {
    const procesadores = [
        // postImport({
        //     root: './src/**/*.css',
        // }),
        // postNesting(),
        autoprefixer(),
        cssnano(),
    ];
    return gulp
        .src('./build/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(procesadores))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'));
}

function gulp_html() {
    return gulp
        .src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./'));
}

function gulp_sass() {
    return gulp
        .src('./src/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'));
}

function gulp_webp() {
    return gulp
        .src(['./src/assets/*.png', './src/assets/*.jpg'])
        .pipe(webp())
        .pipe(gulp.dest('./build/assets'));
}

// function gulp_imagemin() {
//     return gulp
//         .src('./src/assets/**/**/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('./build/assets/'));
// }

// function gulp_js() {
//     return gulp
//         .src('./src/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(terser())
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('./build/'))
// }

function watch() {
    gulp.watch('./src/*.html', gulp_html);
    // gulp.watch('./build/*.css', gulp_css);
    gulp.watch('./src/**/*.scss', gulp.series(gulp_sass, gulp_css));
    // gulp.watch('./src/*.js', gulp_js)
}

// exports.css = gulp_css;
exports.sass = gulp_sass;
exports.html = gulp_html;
exports.watch = watch;
exports.webp = gulp_webp;
// exports.imagemin = gulp_imagemin;
// exports.js = gulp_js
