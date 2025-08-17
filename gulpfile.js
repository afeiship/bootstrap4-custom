import gulp from 'gulp';
import { deleteAsync } from 'del';
import * as sass from 'sass'; // ✅ 正确方式：使用 namespace import
import gulpSass from 'gulp-sass';
import size from 'gulp-size';

// 创建 sass 编译器实例（传入 sass 模块）
const gulpSassInstance = gulpSass(sass); // 注意：传的是整个 `sass` 命名空间
const outputStyle = process.env.sass_output_style;

console.log("current env: ", process.env.bs_version, outputStyle);

const sassOptions = {
  silenceDeprecations: [
    'legacy-js-api',
    'mixed-decls',
    'color-functions',
    'global-builtin',
    'import'
  ],
  outputStyle,
  indentType: 'space',
  indentWidth: 2,
  includePaths: ['./node_modules']
};

gulp.task('clean', function () {
  return deleteAsync(['dist']);
});

gulp.task('sass', function () {
  return gulp
    .src('lib/*.scss')
    .pipe(gulpSassInstance(sassOptions).on('error', gulpSassInstance.logError))
    .pipe(size())
    .pipe(gulp.dest('dist'));
});

gulp.task('sass:watch', function () {
  gulp.watch('lib/**/*.scss', gulp.series('sass'));
});

// dev
gulp.task('dev', gulp.series(['sass', 'sass:watch']));

// build
gulp.task('default', gulp.series(['clean', 'sass']));
