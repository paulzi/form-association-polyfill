module.exports = function(grunt) {
    grunt.initConfig({
        meta: {
            banner: "/**\n" +
                " * Form association polyfill\n" +
                " * @see https://github.com/paulzi/<%= pkg.name %>\n" +
                " * @license MIT (https://github.com/paulzi/<%= pkg.name %>/blob/master/LICENSE)\n" +
                " * @version <%= pkg.version %>\n" +
                " */\n"
        },
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'src/use-strict.js',
                    'src/internal.js',
                    'src/button-active-element-fix.js',
                    'src/association.js',
                    'src/submission.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            },
            banner: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src:  'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        umd: {
            all: {
                options: {
                    src: 'dist/<%= pkg.name %>.js',
                    deps: {
                        'default': [{'jquery': '$'}],
                        global: ['root.jQuery']
                    }
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', '!src/use-strict.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['src/**/*'],
            tasks: ['jshint', 'concat:dist', 'umd', 'concat:banner', 'uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-umd');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'concat:dist', 'umd', 'concat:banner', 'uglify']);

};