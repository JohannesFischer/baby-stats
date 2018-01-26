const moment = require('moment');
const csvr = require('./csv-reader');

csvr.read().then(data => {
  for (row of data) {
    const [ baby, time, duration, note ] = row;

    const date = moment(time,'DD/MM/YYYY HHmm').format();
    console.log(date);
  }
});


