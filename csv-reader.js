var fs = require('fs');
const parse = require('csv-parse');

function read(file) {
  return new Promise((resolve,reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject(err);

      const options = {
        from: 2
      };

      parse(data, options, (err, output) => {
        if (err) reject(err);

        resolve(output);
      });
    });
  });
}

module.exports = {
  read
}
