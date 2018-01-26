console.log('it works!');

const csvr = require('./csv-reader');

csvr.test().then(data => {
  console.log(data);
});
