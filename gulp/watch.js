import gulp from 'gulp';
import util from 'gulp-util';
import path from 'path';
import browserSync from 'browser-sync';
import {paths} from './paths';

const reload = browserSync.reload;

function logChanges(event) {
    util.log(
        util.colors.green('File ' + event.type + ': ') +
        util.colors.magenta(path.basename(event.path))
    );
}

gulp.task('watch', ['scripts', 'sass', 'img', 'html'], () => {
    browserSync({
        notify: false,
        server: 'src/build',
        port: 3000
    });
    gulp.watch([paths.dev.js + '**/*.js'], ['scripts', reload]).on('change', logChanges);
    gulp.watch([paths.dev.sass + '**/*.scss'], ['sass', reload]).on('change', logChanges);
    gulp.watch([paths.dev.img + '**/*'], ['img', reload]).on('change', logChanges);
    gulp.watch([paths.dev.html + '**/*.html'], ['html', reload]).on('change', logChanges);
});