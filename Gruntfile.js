'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'dev/vendor/bootstrap/js/*.js',
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
          ],
          'dist/assets/css/<%= pkg.name %>-responsive.css': [
            'dev/less/<%= pkg.name %>-responsive.less'
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
          ],
          'dist/assets/css/<%= pkg.name %>-responsive.min.css': [
            'dev/less/<%= pkg.name %>-responsive.less'
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
      dev_template: {
        options: {
          map: {
            prev: 'dist/assets/css/'
          }
        },
        src: 'dist/assets/css/<%= pkg.name %>.css'
      },
      build_template: {
        src: 'dist/assets/css/<%= pkg.name %>.min.css'
      },
      dev_responsive: {
        options: {
          map: {
            prev: 'dist/assets/css/'
          }
        },
        src: 'dist/assets/css/<%= pkg.name %>-responsive.css'
      },
      build_responsive: {
        src: 'dist/assets/css/<%= pkg.name %>-responsive.min.css'
      }
    },

    watch: {
      less: {
        files: [
          'dev/less/**'
        ],
        tasks: ['less:dev', 'less:build', 'autoprefixer:build_template', 'autoprefixer:build_responsive']
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
    'watch'
  ]);
  grunt.registerTask('export_release', [
    'less',
    'autoprefixer',
    'concat',
    'uglify',
    'compress'
  ]);
  grunt.registerTask('export_demo', [
    'less',
    'autoprefixer',
    'concat',
    'uglify',
    'copy:demo',
    'git_deploy:demo'
  ]);
};
