'use strict';
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var jsFileList = [
    'dev/vendor/bootstrap/js/transition.js',
    'dev/vendor/bootstrap/js/alert.js',
    'dev/vendor/bootstrap/js/button.js',
    'dev/vendor/bootstrap/js/carousel.js',
    'dev/vendor/bootstrap/js/collapse.js',
    'dev/vendor/bootstrap/js/dropdown.js',
    'dev/vendor/bootstrap/js/modal.js',
    'dev/vendor/bootstrap/js/tooltip.js',
    'dev/vendor/bootstrap/js/popover.js',
    'dev/vendor/bootstrap/js/scrollspy.js',
    'dev/vendor/bootstrap/js/tab.js',
    'dev/vendor/bootstrap/js/affix.js',
    'dev/js/<%= pkg.name %>.js',
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'dev/js/**'
      ]
    },

    less: {
      dev: {
        files: {
          'dist/assets/css/<%= pkg.name %>.css': [
            'dev/less/<%= pkg.name %>.less'
          ]
        },
        options: {
          compress: false,
          sourceMap: true,
          sourceMapFilename: 'dist/assets/css/<%= pkg.name %>.css.map'
        }
      },

      build: {
        files: {
          'dist/assets/css/<%= pkg.name %>.min.css': [
            'dev/less/<%= pkg.name %>.less'
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
        dest: 'dist/assets/js/<%= pkg.name %>.js',
      },
    },

    uglify: {
      dist: {
        files: {
          'dist/assets/js/<%= pkg.name %>.min.js': [jsFileList]
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'dist/assets/css/'
          }
        },
        src: 'dist/assets/css/<%= pkg.name %>.css'
      },
      build: {
        src: 'dist/assets/css/<%= pkg.name %>.min.css'
      }
    },

    watch: {
      less: {
        files: [
          'dev/less/**'
        ],
        tasks: ['less:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['concat', 'uglify']
      },
      livereload: {
        options: {
          livereload: false
        },
        files: [
          'dist/assets/css/**',
          'dist/assets/js/**',
          'dist/*.php'
        ]
      }
    },

    compress: {
      main: {
        options: {
          archive: 'release/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [
          { expand: true, cwd: 'dist/', src: ['**'], dest: '<%= pkg.name %>/' }
        ]
      }
    },

    copy: {
    	assets: {
        expand: true,
        cwd: 'dev/vendor/fontawesome/font/',
        src: ['**'],
        dest: 'dist/assets/font/',
        filter: 'isFile'
      },
      demo: {
        expand: true,
        cwd: 'dist/',
        src: ['**'],
        dest: 'demo/'
      }
    },

    git_deploy: {
      demo: {
        options: {
          url: '<%= pkg.repository.url %>',
          branch: 'demo',
          message: 'Export theme to demo <%= pkg.name %> <%= pkg.version %>'
        },
        src: 'demo'
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev',[
    'copy:assets',
    'jshint',
    'less:build',
    'uglify'
  ]);
  grunt.registerTask('export_release', [
  	'copy:assets',
    'less',
    'autoprefixer',
    'concat',
    'uglify',
    'compress'
  ]);
  grunt.registerTask('export_demo', [
  	'copy:assets',
    'less',
    'autoprefixer',
    'concat',
    'uglify',
    'copy:demo',
    'git_deploy:demo'
  ]);
};
