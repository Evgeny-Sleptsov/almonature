'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';


requireDir('./gulp', { recurse: false });
gulp.task('default', ['watch']);
