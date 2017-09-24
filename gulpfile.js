const gulp = require('gulp'),
   sass = require('gulp-sass'),
   gulpif = require('gulp-if'),
   concat = require('gulp-concat'),
   cleanCSS = require('gulp-clean-css'),
   fs = require('fs-extra'),
   browserSync = require('browser-sync').create(),
   autoprefixer = require('gulp-autoprefixer'),
   babel = require('gulp-babel');

const SRC = 'src',
   DIST = 'dist',
   CORE_SRC = `${SRC}/aver-core`,
   CORE_DEST = `${DIST}/aver-core`,

   SASS_SRC = `${CORE_SRC}/scss`,
   SASS_DEST = `${CORE_DEST}/css`,

   ASSETS_SRC = `${CORE_SRC}/assets`,
   ASSETS_DEST = `${CORE_DEST}/assets`,

   JS_CORE_SRC = `${CORE_SRC}/js`,
   JS_CORE_DEST = `${CORE_DEST}/js`,

   JS_FIREBASE_SRC = `${SRC}/aver-firebase/`,
   JS_FIREBASE_DEST = 'dist/aver-firebase/';

var deploy = false;

gulp.task('styles', () => {
   gulp.src(`${SASS_SRC}/*.scss`)
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
      }))
      .pipe(gulpif(deploy, cleanCSS()))
      .pipe(gulp.dest(SASS_DEST));
});


gulp.task('js-core', () => {
   gulp.src(`${JS_CORE_SRC}/**/*.js`)
      .pipe(babel({
         presets: ['es2015']
      })).pipe(concat('aver-core.js'))
      .pipe(gulp.dest(JS_CORE_DEST));
});

gulp.task('js-firebase', () => {
   gulp.src(`${JS_FIREBASE_SRC}/**/*.js`)
      .pipe(babel({
         presets: ['env']
      })).pipe(concat('aver-firebase.js'))
      .pipe(gulp.dest(JS_FIREBASE_DEST));
});

gulp.task('copy-assets', () => {
   fs.copySync(ASSETS_SRC, ASSETS_DEST);
   fs.copySync(`${CORE_SRC}/html/login/admin.html`, `${CORE_DEST}/admin.html`);
});


gulp.task('default', () => {
   gulp.start('styles');
   gulp.start('js-core');
   gulp.start('js-firebase');
   gulp.start('copy-assets');
});

gulp.task('deploy', () => {
   deploy = true;
   gulp.start('default');
});


gulp.task('dev', ['default'], () => {
   browserSync.init({
      server: {
         baseDir: "./dist"
      }
   });
   gulp.watch(`${SASS_SRC}/**/*.scss`, ['styles']);
   gulp.watch(`${CORE_SRC}/html/**/*.html`, ['copy-assets']);
//gulp.watch(`${TEMPLATES_SRC}/**/*.html`, ['create-admin-pages']);
   gulp.watch(`${JS_CORE_SRC}/**/*.js`, ['js-core']);
   gulp.watch(`${JS_FIREBASE_SRC}/**/*.js`, ['js-firebase']);
   gulp.watch(`${DIST}/**/*`, browserSync.reload)
});