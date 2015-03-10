'use strict';

module.exports = function (grunt) {
    var localConfig;
    try {
        localConfig = require('./config');
    } catch(e) {
        localConfig = {};
    }

    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        express: 'grunt-express-server'
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            options: {
                port: (localConfig ? localConfig.port : undefined) || process.env.PORT || 3000
            },
            dev: {
                options: {
                    script: 'src/server.js',
                    debug: true
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            sass: {
                files: [
                    'src/css/**/*.{scss,sass}'],
                tasks: ['sass:server'],
                options: {
                    livereload: false
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    'src/css/*.css',
                    'src/index.html',
                    'src/js/*.js',
                    'src/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                    livereload: true
                }
            },
            express: {
                files: [
                    '**/*.{js,json}'
                ],
                tasks: ['express:dev', 'wait'],
                options: {
                    livereload: true,
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        },
        clean: {
            server: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/*'
                    ]
                }]
            }
        },
        concurrent: {
            server: [
                'sass:server'
            ],
            dist: [
                'sass:dist'
            ]
        },
        sass: {
            server: {
                options: {
                    loadPath: [
                        'src/bower_components',
                        'src/css'
                    ],
                    compass: false
                },
                files: {
                    'src/css/evaluation.css': 'src/css/evaluation.scss'
                }
            },
            dist: {
                options: {
                    style: 'expanded',
                    loadPath: [
                        'src/bower_components',
                        'src/css'
                    ],
                    compass: false
                },
                files: {
                    'dist/style-guide.css': 'src/css/style-guide.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist',
                    ext: '.min.css'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: 'src/css',
                    dest: 'dist',
                    src: [
                        '*.scss',
                        '!style-guide.scss',
                        '!evaluation.scss'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: 'src',
                dest: '.tmp/',
                src: ['*.css']
            }
        },
        buildcontrol: {
            options: {
                dir: 'dist',
                commit: true,
                push: false,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            local: {
                options: {
                    remote: '../',
                    branch: 'build'
                }
            }
        }
    });

    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });

    grunt.registerTask('serve', function () {
        grunt.task.run([
            'clean',
            'concurrent:server',
            'express:dev',
            'wait',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', function () {
        grunt.task.run([
            'clean',
            'concurrent:dist',
            'cssmin',
            'copy:dist'
        ]);
    });
};