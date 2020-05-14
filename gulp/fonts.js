import gulp from 'gulp';
import {paths} from './paths';

gulp.task('fonts', () => {
    gulp.src(paths.dev.fonts + '**/**')
        .pipe(gulp.dest(paths.build.fonts));
});