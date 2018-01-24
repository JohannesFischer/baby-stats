function test() {
  console.log('test from csv-reader: it works!');
}


var fs = require('fs');
const parse = require('csv-parse');

fs.readFile('csv/sleep.csv', 'utf-8', (err, data) => {
  if (err) throw err;
  var d = parse(data, {auto_parse_date: true}, (err, output) => {
    console.log(output);
  });

  // console.log(d);
});


module.exports = {
  test
}