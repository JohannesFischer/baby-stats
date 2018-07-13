const moment = require('moment');
const csvr = require('./csv-reader');
const config = require('./config');
const MongoDB = require('./db/mongodb');
const Diaper = require('./db/models/diaper');
const Nursing = require('./db/models/nursing');
const Sleep = require('./db/models/sleep');
const {
  capitalize,
  durationInMinutes,
  humanizeDuration,
  makeDateObject
} = require('./util/format');
const { reduceCount } = require('./util/results');

MongoDB.connect();

// Sleep.count({}, function (err, count) {
//   if (err) console.log(err);
//   console.log('there are %d entries.', count);
// });

console.log('👶 Your Baby');
const birthDay = moment(config.baby.birthDay);
console.log(`Age now: ${birthDay.toNow()}`);

Sleep.aggregate()
  .group({
    _id: null,
    durationAvg: { $avg: '$duration' },
    durationSum: { $sum: '$duration' },
    count: { $sum: 1 }
  })
  .exec(function(err, res) {
    if (err) return handleError(err);

    if (res.length === 0) return;

    const [ group ] = res;
    const durationAverage = moment.duration(group.durationAvg, 'minutes');
    const durationOverall = moment.duration(group.durationSum, 'minutes');
    const overallSleep = humanizeDuration(durationOverall);

    console.log('😴  Sleep');
    console.log('Slept %d times.', group.count);
    console.log(`Slept ${durationAverage.hours()} hour${durationAverage.hours() > 1 ? 's' : ''} and ${durationAverage.minutes()} minutes in average.`);
    console.log(`Slept more than ${overallSleep} overall.`);
});

Nursing.aggregate()
  .sort({ startSide: 'desc' })
  .group({
    _id: null,
    durationLeft: { $sum: '$durationLeft' },
    durationRight: { $sum: '$durationRight' },
    count: { $sum: 1 }
  })
  .exec(function(err, res) {
    if (err) return handleError(err);

    if (res.length === 0) return;

    const sum = reduceCount(res);
    const [ group ] = res;
    console.log('🍼  Nursing');
    console.log('Nursed %d times.', sum);

    const durationSum = group.durationLeft + group.durationRight;
    const nursingDuration = moment.duration(durationSum, 'minutes');
    const overallNursing = humanizeDuration(nursingDuration);

    console.log(`Nursed duration: ${overallNursing}`);
    console.log(`Left side: ${Math.round((100 * group.durationLeft) / durationSum)}%`);
    console.log(`Right side: ${Math.round((100 * group.durationRight) / durationSum)}%`);
  });

Diaper.groupByStatus(function(res) {
  const sum = reduceCount(res);
  console.log('💩 Diaper');
  console.log('Changed %d times', sum);
  console.log(res)
  res.forEach(function(doc) {
    const percent = Math.round((100 * doc.count)/ sum);
    if (percent > 0) {
      console.log(`${doc._id} status: ${percent}%`);
    }
  });
});
