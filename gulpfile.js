var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('js', function () {
    browserify({
        entries: './src/js/app.jsx',
        extensions: ['.jsx'],
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(plumber())
        .pipe(source('app.js'))
        .pipe(gulp.dest('assets/js'))
});

gulp.task('watch', ['js'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/js/**', ['js']);
    gulp.watch(['index.html'],reload)
    gulp.watch(['assets/js/**/*'],reload)

});