const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

function browserSyn() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
}

function cleanDist() {
  return del('dist');
}

function images() {
  return src('app/images/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(dest('dist/images'));
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'app/js/main.js',
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(
      autoprefixer({
        overrideBrowsersList: ['last 10 version'],
        grid: true,
      }),
    )
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  // будет следить за всеми папками и
  //файлами с расширением .scss в app/scss
  // и при изенении запускать таску styles

  watch(['app/*html']).on('change', browserSync.reload);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
}

function build() {
  return src(
    [
      'app/css/style.min.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/*.html',
    ],
    { base: 'app' },
    { allowEmpty: true },
  ).pipe(dest('dist'));
}

exports.styles = styles;
exports.watching = watching;
exports.browserSyn = browserSyn;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browserSyn, watching);
