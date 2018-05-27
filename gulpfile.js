/*
 * DEPENDENCIAS
 * para instalar por primera vez escriba:
 * npm install -save-dev NOMBRE_DEPENDENCIA
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    
    watch = require('gulp-watch'),
    connect = require('gulp-connect');
var browserSync = require('browser-sync').create();

/*
    minimizacion y concatenacion de javascript
*/
gulp.task('minify-js', function() {
    gulp.src('js/app/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify({mangle: false}).on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
/*
    configurar browserSync
*/
gulp.task('browserSync', function() {
    browserSync.init({
		open:false,
        server: {
            baseDir: './'
        },
    })
})

gulp.task("default",["minify-js"]);
gulp.task("dev",["default","browserSync"], function() {

    // recargar la página cuando los archivos HTML o JS cambien
    //asi como también minificar cuando se cambie un archivo
    gulp.watch('css/**/*.css', ['minify-css',browserSync.reload]);
    gulp.watch('js/**/*.js', ['minify-js',browserSync.reload]);
    gulp.watch('index.html', browserSync.reload);
    gulp.watch('views/**/*.html', browserSync.reload);
    //gulp.watch('js/**/*.js', browserSync.reload);
});
