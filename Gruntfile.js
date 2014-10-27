'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'src/assets/vendor/bootstrap/js/transition.js',
    'src/assets/vendor/bootstrap/js/alert.js',
    'src/assets/vendor/bootstrap/js/button.js',
    'src/assets/vendor/bootstrap/js/carousel.js',
    'src/assets/vendor/bootstrap/js/collapse.js',
    'src/assets/vendor/bootstrap/js/dropdown.js',
    'src/assets/vendor/bootstrap/js/modal.js',
    'src/assets/vendor/bootstrap/js/tooltip.js',
    'src/assets/vendor/bootstrap/js/popover.js',
    'src/assets/vendor/bootstrap/js/scrollspy.js',
    'src/assets/vendor/bootstrap/js/tab.js',
    'src/assets/vendor/bootstrap/js/affix.js',
    'src/assets/js/_*.js'
  ];

  grunt.initConfig({
    zip: {
      theme: {
        src: [
          'src/*.php',
          'src/*.css',
          'src/readme.txt',
          'src/changelog.txt',
          'src/screenshot.png',
          'src/assets/*.*',
          'src/assets/css/editor-style.css',
          'src/assets/css/main.min.css',
          'src/assets/img/**',
          'src/assets/js/html5shiv.min.js',
          'src/assets/js/respond.min.js',
          'src/assets/js/scripts.min.js',
          'src/assets/vendor/fontawesome/fonts/**',
          'src/inc/**',
          'src/languages/**',
        ],
        dest: '../wp-theme-config.zip'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/assets/js/*.js',
        '!src/assets/js/scripts.js',
        '!src/assets/**/*.min.*'
      ]
    },
    less: {
      dev: {
        files: {
          'src/assets/css/main.css': [
            'src/assets/less/main.less'
          ]
        },
        options: {
          compress: false,
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: true,
          sourceMapFilename: 'src/assets/css/main.css.map',
          sourceMapRootpath: '/app/themes/wp-theme-config/src/'
        }
      },
      build: {
        files: {
          'src/assets/css/main.min.css': [
            'src/assets/less/main.less'
          ]
        },
        options: {
          compress: true
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'src/assets/js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'src/assets/js/scripts.min.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'src/assets/css/'
          }
        },
        src: 'src/assets/css/main.css'
      },
      build: {
        src: 'src/assets/css/main.min.css'
      }
    },
    watch: {
      less: {
        files: [
          'src/assets/less/*.less',
          'src/assets/less/**/*.less'
        ],
        tasks: ['less:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'src/assets/css/main.css',
          'src/assets/js/scripts.js',
          'src/*.php'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'jshint',
    'less:dev',
    'autoprefixer:dev',
    'concat'
  ]);
  grunt.registerTask('build', [
    'jshint',
    'less:build',
    'autoprefixer:build',
    'uglify'
  ]);
};
