const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
// const { parallel } = require('gulp');
const rename      = require("gulp-rename");
// const autoprefixer = require('autoprefixer');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            // baseDir: "./"
            baseDir: "src"
        }
    });
});

gulp.task('styles', function() {
    // return gulp.src("sass/*.+(sass|scss)")
    return gulp.src("src/sass/*.+(sass|scss)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
          }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        // .pipe(gulp.dest("./style"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
}  )

gulp.task('watch', function(){
    // gulp.watch("sass/*.+(sass|scss)", gulp.parallel('styles'));
    gulp.watch("src/sass/*.+(sass|scss)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));

// *****
