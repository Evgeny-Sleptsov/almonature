'use strict';

import gulp from 'gulp';
import del from 'del';
import {paths} from './paths';

// clean the build dir
gulp.task('clean', () => {
    del([`${paths.build.buildPath}/*`]);
});