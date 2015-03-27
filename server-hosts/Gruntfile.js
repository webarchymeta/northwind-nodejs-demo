module.exports = function (grunt) {
    //Initializing the configuration object
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration
        concat: {
            options: {
                separator: ';',
            },
            start: {
                src: [
                        '../external/bower_components/font-awesome/css/font-awesome.min.css',
                        '../external/bower_components/vis/dist/vis.min.css',
                        './public/styles/css/tmp/common.css'
                     ],
                dest: './public/styles/css/common.css',
            },
            redmond: {
                src: [
                        './public/styles/css/tmp/common.css'
                     ],
                dest: './public/css/site.css',
            }
        },
        less: {
            development: {
                options: {
                    compress: false,  //minifying the result
                },
                files: {
                    "./public/styles/css/tmp/common.css": "./public/styles/css/common.less"
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                         '<%= grunt.template.today("yyyy-mm-dd") %> */',
                mangle: false  // Use if you want the names of your functions and variables unchanged
            },
            t: {
                files: {
                    './public/scripts/require.js': ['./bower_components/requirejs/require.js'],
                    './public/scripts/text.js': ['./bower_components/text/text.js'],
                    './public/scripts/modernizr.js': ['./bower_components/modernizr/modernizr.js']
                }
            }
        },
        sync: {
            fonts_a: {
                cwd: './bower_components/font-awesome/fonts',
                src: '**',
                dest: './public/fonts'
            },
            fonts_b: {
                cwd: './bower_components/bootstrap/fonts',
                src: '**',
                dest: './public/fonts'
            }
        },
        //phpunit {
        //          //...
        //},
        watch: {
            less: {
                files: ['./public/css/*.less'],  //watched files
                tasks: ['build-css'],               //tasks to run
                options: {
                    livereload: true                        //reloads the browser
                }
            },
        }
    });
    
    // Plugin loading
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-phpunit');
    
    // Task definition
    grunt.registerTask('build-css', ['less', 'concat:start']);
    grunt.registerTask('sync-fonts', ['sync:fonts_a', 'sync:fonts_b']);
    grunt.registerTask('initial-build', ['build-css', 'sync-fonts', 'uglify']);
    
    grunt.registerTask('default', ['watch']);
};
