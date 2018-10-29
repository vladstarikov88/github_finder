let gulp         = require('gulp'),
    less         = require('gulp-less'),
    browserSync  = require('browser-sync'),
    del          = require('del');
    babel        = require("gulp-babel");


function swallowError (error) {
    console.log(error.toString())
    this.emit('end')
}


gulp.task('clean', function() {
    return del.sync('build');
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('js', function(){
    return gulp.src('src/js/**/*.js')
        .pipe(babel())
        .on('error', swallowError)
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('less', function(){
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('assets', function(){
    return gulp.src('src/assets/*.*')
        .pipe(gulp.dest('build/assets'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', ['clean', 'html', 'less','js', 'assets'], function() {
    browserSync({
        server: {
            baseDir: './build/'
        }
    });
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/**/*.html',  ['html']);
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', ['watch']);