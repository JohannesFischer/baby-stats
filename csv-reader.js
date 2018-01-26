var fs = require('fs');
const parse = require('csv-parse');

function test() {
  console.log('test from csv-reader: it works!');

  return new Promise((resolve,reject) => {
    fs.readFile('csv/sleep.csv', 'utf-8', (err, data) => {
      if (err) throw reject(err);

      parse(data, {auto_parse_date: true}, (err, output) => {
        resolve(output);
      });
    });
  });
}

module.exports = {
  test
}
