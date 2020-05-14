'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';
import runSeq from 'run-sequence';


requireDir('../gulp/', { recurse: false });

gulp.task('build', (done) => {
    runSeq('clean', ['sass_prod', 'img_prod', 'scripts_prod'], 'html_prod', done);
});