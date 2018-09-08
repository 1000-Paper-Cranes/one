//aaronlasseigne.com/2016/02/03/using-gulp-with-jekyll/ 
const gulp = require('gulp');
const child = require('child_process');
const browserSync = require('browser-sync').create();
const log = require('fancy-log');
const siteRoot = 'site'; 

//start jekyll and serve with browsersync
gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => { 
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });
});


gulp.task('default', [ 'jekyll', 'serve']);



