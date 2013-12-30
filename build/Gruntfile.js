/* jslint es3: false */
/* global module:false */

module.exports = function(grunt) {
	
	'use strict';
	
	grunt.initConfig({
		
		/*----------------------------------( PACKAGE )----------------------------------*/
		
		/**
		 * The `package.json` file belongs in the root directory of your project,
		 * next to the `Gruntfile`, and should be committed with your project
		 * source. Running `npm install` in the same folder as a `package.json`
		 * file will install the correct version of each dependency listed therein.
		 *
		 * Install project dependencies with `npm install` (or `npm update`).
		 *
		 * @see http://gruntjs.com/getting-started#package.json
		 * @see https://npmjs.org/doc/json.html
		 */
		
		pkg : grunt.file.readJSON('package.json'),
		
		/*----------------------------------( BANNERS )----------------------------------*/
		
		/**
		 * Short and long banners.
		 *
		 * @see http://gruntjs.com/getting-started#an-example-gruntfile
		 */
		
		meta : {
			
			banner_long : '/**\n' +
			              ' * <%= pkg.title || pkg.name %>\n' +
			              '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
			              ' *\n' +
			              '<%= pkg.author.name ? " * @author " + pkg.author.name + "\\n" : "" %>' +
			              '<%= pkg.author.url ? " * @link " + pkg.author.url + "\\n" : "" %>' +
			              '<%= pkg.homepage ? " * @docs " + pkg.homepage + "\\n" : "" %>' +
			              ' * @copyright Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>.\n' +
			              '<%= pkg.licenses ? " * @license Released under the " + _.pluck(pkg.licenses, "type").join(", ") + ".\\n" : "" %>' +
			              '<%= pkg.version ? " * @version " + pkg.version + "\\n" : "" %>' +
			              ' * @date <%= grunt.template.today("yyyy/mm/dd") %>\n' +
			              ' */\n\n',
			
			banner_short : '/*! ' +
			               '<%= pkg.title || pkg.name %>' +
			               '<%= pkg.version ? " v" + pkg.version : "" %>' +
			               '<%= pkg.licenses ? " | " + _.pluck(pkg.licenses, "type").join(", ") : "" %>' +
			               '<%= pkg.homepage ? " | " + pkg.homepage : "" %>' +
			               ' */'
			
		},
		
		/*----------------------------------( WATCH )----------------------------------*/
		
		/**
		 * Run predefined tasks whenever watched file patterns are added, changed
		 * or deleted.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-watch
		 */
		
		watch : {
			
			tmpl : {
				
				files : [
					
					'./src/jquery.<%= pkg.name %>.js',
					'../demo/**/*',
					
				],
				
				tasks : ['default'],
				
			}
			
		},
		
		/*----------------------------------( JSHINT )----------------------------------*/
		
		/**
		 * Validate files with JSHint.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-jshint
		 * @see http://www.jshint.com/
		 * @see http://www.jshint.com/docs/
		 */
		
		jshint : {
			
			options : {
				
				jshintrc : '.jshintrc', // Defined options and globals.
				
			},
			
			all : [
				
				'./Gruntfile.js',
				'./src/jquery.<%= pkg.name %>.js',
				
			],
			
		},
		
		/*----------------------------------( CLEAN )----------------------------------*/
		
		/**
		 * Clean files and folders.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-clean
		 */
		
		clean : {
			
			options : {
				
				force : true, // Allows for deletion of folders outside current working dir (CWD). Use with caution.
				
			},
			
			all : [
				
				'../<%= pkg.name %>/**/*',
				
			],
			
		},
		
		/*----------------------------------( UGLIFY )----------------------------------*/
		
		/**
		 * Minify files with UglifyJS.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-uglify
		 * @see http://lisperator.net/uglifyjs/
		 */
		
		uglify : {
			
			target : {
				
				options : {
					
					banner : '<%= meta.banner_short %>',
					
				},
				
				files : {
					
					'../<%= pkg.name %>/jquery.<%= pkg.name %>.min.js': [
						
						'./src/jquery.<%= pkg.name %>.js',
						
					],
					
				},
				
			},
			
		},
		
		/*----------------------------------( CONCAT )----------------------------------*/
		
		/**
		 * Concatenate files.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-concat
		 * @see https://github.com/gruntjs/grunt-contrib-concat/pull/25
		 */
		
		concat : {
			
			options : {
				
				banner : '<%= meta.banner_long %>',
				
			},
			
			files : {
				
				src : [
					
					'./src/jquery.<%= pkg.name %>.js',
					
				],
				
				dest : '../<%= pkg.name %>/jquery.<%= pkg.name %>.js',
				
			},
			
		},
		
	});
	
	/*----------------------------------( TASKS )----------------------------------*/
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	//----------------------------------
	
	grunt.registerTask('default', ['jshint', 'clean', 'uglify', 'concat',]);
	
};
