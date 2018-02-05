const csvr = require('./csv-reader');
const moment = require('moment');
const { durationInMinutes, makeDateObject } = require('./util/format');
const MongoDB = require('./db/mongodb');
const Nursing = require('./db/models/nursing');
const Sleep = require('./db/models/sleep');

MongoDB.connect();

Sleep.count({}, function (err, count) {
  if (err) console.log(err);
  console.log('there are %d entries.', count);
});

Sleep.aggregate()
  .group({
    _id: null,
    durationAvg: { $avg: '$duration' },
    durationSum: { $sum: '$duration' },
    count: { $sum: 1 }
  })
  .exec(function(err, res) {
    if (err) return handleError(err);

    const [ group ] = res;
    const durationAverage = moment.duration(group.durationAvg, 'minutes');
    const durationOverall = moment.duration(group.durationSum, 'minutes');

    console.log('😴  Sleep');
    console.log('Slept %d times.', group.count);
    console.log(`Slept ${durationAverage.hours()} hour${durationAverage.hours() > 1 ? 's' : ''} and ${durationAverage.minutes()} minutes in average.`);
    console.log(`Slept more than ${durationOverall.days()} days and ${durationOverall.hours()} hours overall.`);
});

Nursing.aggregate()
  .sort({ startSide: 'desc' })
  .group({
    _id: '$startSide',
    count: { $sum: 1 }
  })
  .exec(function(err, res) {
    if (err) return handleError(err);
    const sum = res.reduce((acc, side) => acc + side.count, 0);
    console.log('🍼  Nursing');
    console.log('Nursed %d times.', sum);
    console.log(`${res[0]._id} side: ${Math.ceil((100 * res[0].count)/ sum)}%`);
    console.log(`${res[1]._id} side: ${Math.ceil((100 * res[1].count) / sum)}%`);
  });
