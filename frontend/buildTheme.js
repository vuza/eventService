const sass = require('node-sass');
const fs = require('fs');
const mkpath = require('mkpath');
const ncp = require('ncp').ncp;

var result = sass.renderSync({
  file: 'src/sass/materialize.scss',
  outputStyle: 'compressed',
  sourceMap: true
});

mkpath.sync('build/static/css/');
fs.writeFileSync('build/static/css/materialize.min.css', result.css);
fs.createReadStream('src/scripts/materialize.min.js').pipe(fs.createWriteStream('build/static/js/materialize.min.js'));
ncp('src/fonts', 'build/static/fonts', function (err) {
  if (err) {
    return console.error(err);
  }
});
