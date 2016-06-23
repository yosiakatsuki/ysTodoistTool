gulp = require 'gulp'
plumber = require 'gulp-plumber'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

#パスの定義
paths =
  base   : './',
  js     : 'ysTodoistBookmarklet.js'

#パスの定義
srcjs     = paths.base + paths.js


#jsファイルのminify
gulp.task 'uglify', ->
  gulp
    .src srcjs
    .pipe plumber
      errorHandler: (err) ->
        console.log(err.messageFormatted)
        this.emit('end')
    .pipe uglify({preserveComments: 'some'})
    .pipe rename({suffix:'.min'})
    .pipe gulp.dest(paths.base)

gulp.task 'watch',->
  gulp.watch srcjs,['uglify']


# デフォルトタスク
gulp.task 'default', ['uglify','watch']
