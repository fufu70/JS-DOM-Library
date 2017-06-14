var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');

var rollupPlugins = [
    nodeResolve({
        jsnext: true,
        browser: true
    }),
    commonjs(),
    babel()
];

module.exports = function (grunt) {

    grunt.config.init({
        rollup: {
            dom: {
                options: {
                    plugins: rollupPlugins
                },
                files: {
                    './dist/dom.js': ['./src/index.js']
                }
            },
        },
        watch: {
            scripts: {
                files: ['./src/js/**/*.js'],
                tasks: ['rollup'],
                options: {
                    interrupt: true
                }
            }
        },
        eslint: {
            target: [
                './src/**/*.js',
                './test/**/*.js',
            ]
        },
        plato: {
            dom: {
                files: {
                    './build/reports': [
                        'src/**/*.js',
                    ]
                }
            }
        },
        exec: {
            test: './node_modules/.bin/karma start --single-run --browsers PhantomJS',
            karmaStart: './node_modules/.bin/karma start',
            karmaRun: './node_modules/.bin/karma run'
        }
    });

    grunt.loadNpmTasks('grunt-rollup');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-ssh');

    grunt.registerTask('build', ['rollup']);
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('test', ['exec:test', 'plato:dom']);
    grunt.registerTask('test-init', ['exec:karmaStart']);
    grunt.registerTask('test-run', ['exec:karmaRun']);
};