import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import gutil from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import gcmq from 'gulp-group-css-media-queries'; 
import cssNano from 'gulp-cssnano';
import {paths} from './paths';


gulp.task('sass', () => {
    return gulp.src(paths.dev.sass + '*.scss')
        .pipe(sass()).on('error', function(error) {
            gutil.log(error.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(paths.build.css));
    });

gulp.task('sass_prod', () => {
    return gulp.src(paths.dev.sass + '*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', function(error) {
            gutil.log(error.toString());
            this.emit('end');
        })
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions','safari >= 10', 'ie >= 11', '> 1%'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(cssNano({
            autoprefixer: {overrideBrowserslist: ['last 2 versions','safari >= 10', 'ie >= 11', '> 1%']},
            reduceIdents: true,
            zindex: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.build.css));
    });