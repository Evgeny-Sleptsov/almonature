
const nameFiles = [
    'almo-main.js'
];

const paths = {
    dev: {
        // dev destination folder
        'devPath': './src/dev/',
        // HTML source files
        'html': './src/dev/html/',
        // SASS source files
        'sass': './src/dev/scss/',
        // image sources files
        'img': './src/dev/images/',
        // JS source files
        'js': './src/dev/js/',
        // Fonts source files
        'fonts': './src/dev/fonts/',
    },
    build: {
        // build destination folder
        'buildPath': './src/build/',
        // build CSS folder
        'css': './src/build/styles/',
        // build JS folder
        'js': './src/build/scripts/',
        // Fonts source files
        'fonts': './src/build/fonts/',
        // Images source files
        'img': './src/build/images/'
    },
};

export {paths};
export {nameFiles};