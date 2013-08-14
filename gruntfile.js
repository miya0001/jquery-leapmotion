module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: "/* jQuery Leap Motion <%= pkg.version %>\n" +
                        " * Copyright (c) <%= grunt.template.today('yyyy') %>" +
                        " <%= pkg.author.name %>\n" +
                        " * License: <%= pkg.license %>\n" +
                        " */\n"
            },
            my_target: {
                files: {
                    'jquery.leapmotion.min.js': ['jquery.leapmotion.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};
