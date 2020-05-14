'use strict';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import jpgcompress from 'imagemin-jpeg-recompress';
import {paths} from './paths';


gulp.task('img', () => {
    return gulp.src(paths.dev.img + '**/*.*')
        .pipe(gulp.dest(paths.build.img));
});

gulp.task('img_prod', () => {
    return gulp.src(paths.dev.img + '**/*.*')
    .pipe(imagemin([
        jpgcompress({
            loops: 4,
            min: 70,
            max: 80,
            quality: 'high'
        }),
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo()
    ],  {
            progressive: true,
            verbose: true,
            interlaced: true
        }
    ))
    .pipe(gulp.dest(paths.build.img));
});
