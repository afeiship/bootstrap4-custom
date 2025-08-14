import gulp from 'gulp';
import { deleteAsync } from 'del';
import * as sass from 'sass'; // ✅ 正确方式：使用 namespace import
import gulpSass from 'gulp-sass';
import size from 'gulp-size';

// 创建 sass 编译器实例（传入 sass 模块）
const gulpSassInstance = gulpSass(sass); // 注意：传的是整个 `sass` 命名空间

const sassOptions = {
  silenceDeprecations: [
    'legacy-js-api',
    'mixed-decls',
    'color-functions',
    'global-builtin',
    'import'
  ],
  outputStyle: 'compressed',
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
    .pipe(
      size({
        showFiles: true, // ✅ 显示每个文件名和大小
        gzip: true, // 可选：显示 gzip 后大小
        title: 'CSS 编译输出:' // 可选：加个标题，便于识别
      })
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series(['clean', 'sass']));
