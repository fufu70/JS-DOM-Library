var istanbul = require('rollup-plugin-istanbul');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var babel = require('rollup-plugin-babel');

var rollupPlugins = [
    nodeResolve({
        jsnext: true,
        browser: true
    }),
    commonjs(),
    babel()
];

module.exports = function (karma) {

    karma.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'PhantomJS'
        ],

        // list of files / patterns to load in the browser
        files: [
            'test/**/*.js',
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['coverage'],
            'test/**/*.js': ['rollup']
        },

        rollupPreprocessor: {
            sourceMap: true,
            format: 'iife',
            plugins: rollupPlugins
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'junit', 'coverage'],

        junitReporter: {
            outputFile: 'test-results.xml',
            outputDir: './build/logs',
            useBrowserName: false
        },

        coverageReporter: {
            dir: './build/coverage/',
            type: 'html'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
        logLevel: karma.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        captureTimeout: 60000, // it was already there
        browserDisconnectTimeout : 10000,
        browserDisconnectTolerance : 1,
        browserNoActivityTimeout : 60000,//by default 10000
    });
};