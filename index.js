const moment = require('moment');
const csvr = require('./csv-reader');

csvr.read().then(data => {
  const babyData = data.map(row => {
    const [ baby, time, duration, note ] = row;

    // modify date to a proper date object
    const date = moment(time,'DD/MM/YYYY HHmm').format();

    // modify duration to be in minutes
    const match = duration.match(/((\d+)\shrs?)?\s?((\d+)\smin)?/);
    const durationString = `${match[2] || '0'}:${match[4] || '00'}`;
    const durationInMin = moment.duration(durationString).asMinutes();

    return {
      date,
      durationInMin
    };
  });

  console.log(babyData);
});


