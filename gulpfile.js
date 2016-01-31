var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('gulp-shell');

gulp.task('sass', function () {
  return gulp.src('./sass/styles.scss')
      .pipe(sass({
        sourceComments: true,
        includePaths: ['bower_components/foundation/scss']
      }).on('error', sass.logError))
      .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('envNodemon', shell.task ([
  'env $(cat .env | xargs) nodemon server.js'
]));

gulp.task('default', ['watch', 'sass', 'envNodemon']);