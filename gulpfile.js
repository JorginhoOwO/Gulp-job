const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // chamada dos arquivos qeu vbaixamos "npm install --save-dev gulp-sass & sass "
const sourcemaps = require('gulp-sourcemaps') ;
const uglify = require ('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function compirmeImagem(){
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript(){
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass(){
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' //arquivo comprimido 
        }))
        .pipe (sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

exports.sass = compilaSass;
exports.default = function(){
    gulp.watch('./source/styles/*.scss',{ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js',{ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*',{ignoreInitial: false}, gulp.series(compirmeImagem)); 
}
