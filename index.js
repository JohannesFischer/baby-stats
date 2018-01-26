const moment = require('moment');
const csvr = require('./csv-reader');

csvr.test().then(data => {
  // console.log(data);

  for (row of data) {
    const [ baby, time, duration, note ] = row;

    const date = moment(time,'DD/MM/YYYY HHmm').format();
    console.log(date);
  }
});


