const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpAutoPrefixer = require('gulp-autoprefixer');
const paths = {
  scss: {
    src: ['./src/scss/**/*.scss', '!./src/scss/**/_*.scss'],
    dest: './public/assets/css'
  }
};

gulp.task('scss', () => {
  return gulp
    .src(paths.scss.src)
    .pipe(
      gulpSass({
        outputStyle: 'compressed'
      })
    )
    .pipe(gulpAutoPrefixer())
    .pipe(gulp.dest(paths.scss.dest));
});

gulp.task('default', () => {
  gulp.watch(paths.scss.src, gulp.series('scss'));
});
