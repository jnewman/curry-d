module.exports = function (grunt) {
    'use strict';

    var pjson = grunt.file.readJSON("package.json");

    var _ = require('lodash');
    _.filter(_.keys(pjson.devDependencies), function (key) {
        return (/^grunt-/).test(key) && key !== 'grunt-cli';
    }).forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        benchmark: {
            all: {
                src: ['perf/**/*.js'],
                dest: 'perf/samples.csv'
            },
            options: {
                // This can also be set inside specific tests.
                displayResults: true
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8008,
                    base: '.'
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: grunt.file.readJSON('.jshintrc')
        },
        'mocha_phantomjs': {
            all: ['test/**/*.html']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: [
                    'test/curry-d-node.js'
                ]
            }
        },
        pkg: pjson,
        uglify: {
            options: {
                banner: [
                    '/**',
                    ' * @license',
                    ' * <%= pkg.name %> <%= pkg.version %> <%= pkg.licenses[0].url %>',
                    ' * Build time: <%= grunt.template.today("yyyy-mm-ddTHH:mm:ss") %>',
                    ' */\n;'
                ].join('\n')
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    grunt.registerTask('perf', ['benchmark']);
    grunt.registerTask('test', ['jshint', 'mocha_phantomjs', 'mochaTest']);
    grunt.registerTask('dist', ['concat:dist', 'uglify', 'test']);
};
