'use-strict'

import gulp from 'gulp';
import html from 'gulp-file-include';
import gutil from 'gulp-util';
import htmlMin from 'gulp-htmlmin';
import {paths} from './paths';

gulp.task('html', function () {
    return gulp.src(paths.dev.html + '*.html')
    .pipe(html({
        prefix: '@@'
    })).on('error', function(error) {
        gutil.log(error.toString());
        this.emit('end');
    })
    .pipe(gulp.dest(paths.build.buildPath));
})

gulp.task('html_prod', function () {
    return gulp.src(paths.dev.html + '*.html')
    .pipe(html({
        prefix: '@@'
    })).on('error', function(error) {
        gutil.log(error.toString());
        this.emit('end');
    })
    .pipe(htmlMin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true
    }))
    .pipe(gulp.dest(paths.build.buildPath));
})