'use sctrie';
module.exports = function(grunt){
 require('load-grunt-tasks')(grunt);
 //require('time-grunt')(grunt);
 var config = {
 	app:'app',
 	dist:'dist'
 };
 grunt.initConfig({
 	config:config,
 	concat:{
 		js:{
 			src:'app/js/**.js',
 			dest:'app/js/index.min.js'
 		}
 	},
 	clean:{
 		js:{
 			src:'app/js/index.min.js'
 		}
 	},
 	sass: {
		dist: {
		  files: {
		    'app/style/css/mian.css': 'app/style/scss/main.scss',
		  }
		}
	},
 	 connect: {
      options: {
        port: 9000,
        hostname: '127.0.0.1', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
        livereload: 35729  //声明给 watch 监听的端口
      },
      server: {
        options: {
          open: true, //自动打开网页 http://
          base: [
            'app'  //主目录
          ]
        }
      }
    },
     watch: {
      livereload: {
        options: {
          livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
        },

        files: [  //下面文件的改变就会实时刷新网页
          'app/*.html',
          'app/style/{,*/}*.scss',
          'app/js/{,*/}*.js',
          'app/img/{,*/}*.{png,jpg,gif}'
        ],
        tasks:['sass']
      },
    //   sass: {
    //     files: 'app/style/**/*.scss',
    //     tasks: 'sass'
    // }
    },
 	inline:{
 		test:{
 			src:['app/index.html']
 		}
 	},
 	rev:{
 		options:{
 			encoding: 'utf8',
		    algorithm: 'md5',
		    length: 8
 		},
 		cssJs:{
 			src:['app/js/*.js','app/style/css/*.css']
 		}
 	},
 	usemin:{
        css:{
            files:{
                src:['app/style/css/*.css']
            }
        },
        js:['app/js/*.js'],
        html:['app/index.html'],
        options:{                    //替换静态文件引地址前缀
            filePrefixer:function(url){
                if(!url){
                    return '';
                }
                return url.replace('../..','<%=request.getContextPath()%>');
            },
            patterns: {
                js: [
                    [/(img\.png)/, 'Replacing reference to image.png']
                ]
            }
        }
    }
 });
grunt.registerTask('serve', [
    'connect:server',
    'watch'
 ]);
 grunt.registerTask('default', ['clean','concat']);

};
