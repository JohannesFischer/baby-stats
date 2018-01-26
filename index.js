const moment = require('moment');
const csvr = require('./csv-reader');

csvr.read().then(data => {
  for (row of data) {
    const [ baby, time, duration, note ] = row;

    // modify date to a proper date object
    const date = moment(time,'DD/MM/YYYY HHmm').format();

    // modify duration to be in minutes
    let dim = duration.replace(/min/, '').replace(/\s+/g, '');
    if (dim.match(/hrs|hr/)) {
      dim = dim.replace(/hrs|hr/,':');
    } else {
      // must add this for mement.js to work
      dim = '0:'.concat(dim);
    }
    const durationInMin = moment.duration(dim).asMinutes();



    console.log(duration);
    console.log(durationInMin);
    console.log(date);
  }
});


