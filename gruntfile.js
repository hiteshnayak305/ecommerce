module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    cssmin:{
      combine:{
        files:{
          'public/css/bootstrap.min.css' : ['bower_components/bootstrap/dist/css/bootstrap.css'],
          'public/css/bootstrap-theme.min.css' : ['bower_components/bootstrap/dist/css/bootstrap-theme.css'],
          'public/css/main.min.css' : ['public/css/main.css']
        }
      }
    },

    uglify:{
      options:{
        banner: '/*  <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist:{
        files:{
          'public/js/jquery.min.js' : ['bower_components/jquery/dist/jquery.js'],
          'public/js/bootstrap.min.js' : ['bower_components/bootstrap/dist/js/bootstrap.js'],
          'public/js/main.min.js' : ['public/js/main.js']
        }
      }
    },

    copy:{
      main:{
        expand: true,
        src: 'bower_components/bootstrap/dist/fonts/*',
        dest: 'public/fonts/',
        flatten: true
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['cssmin','uglify','copy']);
  //grunt.registerTask('cssmin', ['cssmin']);
  //grunt.registerTask('uglify', ['uglify']);

};
