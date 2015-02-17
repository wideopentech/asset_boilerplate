module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            base: {
                src: [
                    'js/build/app/components/*.js',
                    'js/build/app/*.js'
                ],
                dest: 'js/<%= pkg.name %>.js'
            },
            libs: {
                src: [
                    'js/build/lib/*.js'
                ],
                dest: 'js/lib.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> */\n'
            },
            dist: {
                files: {
                    'js/<%= pkg.name %>.min.js': ['<%= concat.base.dest %>']
                }
            },
            lib: {
                files: {
                    'js/lib.min.js': ['js/lib.js']
                }
            }
        },
        compass: {
            clean: {
                options: {
                    clean: true
                }
            },
            //Expanded Files for DEV
            dev: {
                options: {
                    sassDir: ['scss'],
                    cssDir: ['css'],
                    imagesDir: ['img'],
                    javascriptsDir: ['js'],
                    outputStyle: ['expanded'],
                    noLineComments: false,
                    force: true,
                    environment: 'development'
                }
            },
            //Compress Files for PROD
            prod: {
                options: {
                    sassDir: ['scss'],
                    cssDir: ['css'],
                    imagesDir: ['img'],
                    javascriptsDir: ['js'],
                    outputStyle: ['compressed'],
                    noLineComments: true,
                    force: true,
                    environment: 'production'
                }
            }
        },
        // watch - tasks triggered with [grunt watch] is initiated in the cli
        watch: {
            less: {
                files: ['scss/*.scss'],
                tasks: ['compass']
            }
        }

    });

    // load tasks from node_modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // tasks that will be triggered with [grunt] in the cli
    // Development Ready Code - Not Compressed!
    grunt.registerTask('default', ['compass:dev', 'concat']);

    // scss task only
    grunt.registerTask('css', ['compass:dev']);

    // javascript task only
    grunt.registerTask('js', ['concat']);

    //Product Ready Code
    grunt.registerTask('prod', ['compass:prod', 'concat', 'uglify']);
};
