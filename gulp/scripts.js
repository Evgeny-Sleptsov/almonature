'use strict';

import gulp from 'gulp';
//import rename from 'gulp-rename';
import gutil from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';

import concat from 'gulp-concat';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import es from 'event-stream';

import {paths} from './paths';
import {nameFiles} from './paths';


const bundleThis = function() {
// map them to our stream function
let tasks = nameFiles.map(function(entry) {
    return browserify({
        entries: [paths.dev.js + entry]
    })
    .transform('babelify', {
        presets: ['es2015']
    })
    .bundle().on('error', function(error) {
        gutil.log(error.toString());
        this.emit('end');
    })
    .pipe(source(entry))
    .pipe(buffer())
    .pipe(concat(entry))
    .pipe(gulp.dest(paths.build.js));
});

// create a merged stream
return es.merge.apply(null, tasks);
};



const bundleBuildThis = function() {
// map them to our stream function
let tasks = nameFiles.map(function(entry) {
    return browserify({
    entries: [paths.dev.js + entry]
    })
    .transform('babelify', {
        presets: ['es2015']
    })
    .bundle().on('error', function(error) {
        gutil.log(error.toString());
        this.emit('end');
    })
    .pipe(source(entry))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(concat(entry))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build.js));
});

// create a merged stream
return es.merge.apply(null, tasks);
};


// babelify JavaScript files
gulp.task('scripts', () => {
    return bundleThis();
});

// babelify and minify JavaScript files (excludes source maps)
gulp.task('scripts_prod', () => {
    return bundleBuildThis();
});