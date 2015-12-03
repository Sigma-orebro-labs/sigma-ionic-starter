var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var templateCache = require('gulp-angular-templatecache');
var insert = require('gulp-insert');
var sourceMaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync'); 
/* Sourcemaps allows us to debug live code */
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var shell = require('gulp-shell');
var pkg = require('./package.json')
var debug = require('gulp-debug');

var paths = {
    sass: ['./src/scss/**/*.scss'],
    js: ['./src/js/**/*.js']
        // jade:   ['./src/jade/**/*.jade']
};

gulp.task('gulp', ['default']); 
gulp.task('default', ['sass', 'bundle-js', 'templateCache']);
/* Compiles ./src/scss into CSS-files */
gulp.task('sass', function(done) {
    gulp.src('./src/scss/ionic.app.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 1
        }))
        .pipe(sourceMaps.write('./maps'))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['bundle-js', 'templateCache']);
    gulp.watch('gulpfile', ['bundle-js', 'templateCache']);
    // gulp.watch(paths.jade, ['jade']);
});

gulp.task('jshint', function() {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

/* Turns the ./src-folder into "compiled" javascript. */
gulp.task('bundle-js', function() {

    /* We most likely wont need to create multiple modules unless we need to build stuff for _both_ ionic and web but with different view-layers or sth.
        Use common sense, this approach could be overkill. Esp since we are serving from file system and not HTTP on devices */

    /* App Base */
    gulp.src(['./src/js/app/app.js', './src/js/app/**/*.js', './src/js/landing/**/*.js'])
        .pipe(sourceMaps.init())
        .pipe(concat('app.dist.js'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./www/js/')); 

    /* Common Module */
    gulp.src(['./src/js/common/app.common.module.js', './src/js/common/**/*.js'])
        .pipe(sourceMaps.init())
        .pipe(concat('app.common.dist.js'))
        .pipe(gulp.dest('./www/js/'));

});

gulp.task('bundle-js-production', function() {
    /* App Base */
    gulp.src(['./src/js/app/app.js', './src/js/app/**/*.js'])
        .pipe(sourceMaps.init())
        .pipe(concat('app.dist.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./www/js/'));
 
    /* Common Module */
    gulp.src(['./src/js/common/app.common.module.js', './src/js/common/**/*.js'])
            .pipe(ngAnnotate())
        .pipe(sourceMaps.init())
        .pipe(concat('app.common.dist.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./www/js/'));
    /*Additional Modules here. */
});

/* Files that MUST be loaded into templateCache, which prevents us from having to wait for http roundtrip.
 *   really important when using things like splashes, which are included  using ng-include on pages. */
gulp.task('templateCache', function() {
    var templateInitCode = "angular.module('templates', []);";
    return gulp.src('./www/templates/splash/*.html')
        // .pipe(debug({title: 'templateCache'}))
        .pipe(templateCache())
        .pipe(insert.prepend(templateInitCode))
        .pipe(rename('app.templates.js')) 
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./www/js/'));
});

gulp.task('serve', shell.task([
    'ionic serve'
]));

gulp.task('android', shell.task([
    'ionic run android'
]));

gulp.task('ios', shell.task([
    'ionic run ios'
]));


gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://localhost:8100" 
    });
}); 
 

/* Not really used by us. Ionic put this here */
gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
}); 