// Since Node.js, supress the 'function form of use strict' warning.
/*jslint node: true */
'use strict';

// Read in NPM's config for Grunt to be able to use.
var packagejson = require('./package.json');

module.exports = function (grunt) {

   // Initial Configuration
   grunt.initConfig({
      pkg: packagejson,
      jshint: {
         //build: ['<%= pkg.name %>.js']
      },
      uglify: {
         options: {
            //banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            //         '<%= grunt.template.today("yyyy-mm-dd") %> */'
         },
         build: {
            //src: '<%= pkg.name %>.js',
            //dest: 'build/<%= pkg.name %>.min.js'
         }
      },
      sass: {
         dist: {
            option: {
               'sourcemap': 'auto',
               'style': 'compressed'
            },
            files: {
               // For now I just made a project file that imports everything so we don't touch the official files.
               'css/main.css': 'sass/main.scss'
            }
         },
         devel: {
            option: {
               'sourcemap': 'auto',
               'style': 'nested'
            },
            files: {
               //'build/main.css': 'sass/main.scss'
               'css/main.css': 'sass/main.scss'
            }
         }
      },
      watch: {
        css: {
            // Was '**/*.scss'
            files: 'sass/**/*.scss',
            tasks: ['sass:devel']
        }
      }
   });

   grunt.registerTask('default', [
      //'jshint',
      //'uglify',
      'sass:devel'
   ]);
    grunt.registerTask('watch', ['watch']);

   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
