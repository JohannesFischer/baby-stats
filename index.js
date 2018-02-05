const csvr = require('./csv-reader');
const moment = require('moment');
const { durationInMinutes, makeDateObject } = require('./util/format');
const MongoDB = require('./db/mongodb');
const Sleep = require('./db/models/sleep');

MongoDB.connect();

Sleep.count({}, function (err, count) {
  if (err) console.log(err);
  console.log('there are %d entries.', count);
});

Sleep.aggregate()
  .group({
    _id: null,
    durationSum: { $sum: '$duration' },
    count: { $sum: 1 }
  })
  .exec(function (err, res) {
    if (err) return handleError(err);

    const [ group ] = res;
    const average = group.durationSum / group.count;
    const durationAverage = moment.duration(average, 'minutes');
    const durationOverall = moment.duration(group.durationSum, 'minutes');

    console.log('😴  Sleep');
    console.log('Slept %d times.', group.count);
    console.log(`Slept ${durationAverage.hours()} hour${durationAverage.hours() > 1 ? 's' : ''} and ${durationAverage.minutes()} minutes in average.`);
    console.log(`Slept more than ${durationOverall.days()} overall.`);
});
