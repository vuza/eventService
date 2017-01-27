const sass = require('node-sass');
const fs = require('fs');
const mkpath = require('mkpath');

var result = sass.renderSync({
  file: 'src/sass/materialize.scss',
  outputStyle: 'compressed',
  sourceMap: true
});

mkpath.sync('build/static/css/');
fs.writeFileSync('build/static/css/materialize.min.css');
fs.createReadStream('src/scripts/materialize.min.js').pipe(fs.createWriteStream('build/static/js/materialize.min.js'));
