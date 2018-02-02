const csvr = require('./csv-reader');
const { durationInMinutes, makeDateObject } = require('./util/format');
const MongoDB = require('./db/mongodb');
const Sleep = require('./db/models/sleep');

MongoDB.connect();

// Average Sleep Duration
// const reducerSum = (accumulator, currentValue) => accumulator + currentValue.durationInMin;
// const average = babyData.reduce(reducerSum, 0) / babyData.length;
// const averageDuration = moment.duration(average, 'minutes');
// console.log(`😴  Average sleep duration is ${averageDuration.hours()}:${averageDuration.minutes()} hours`)

Sleep.find({}, function(err, docs) {
  console.log(`Sleep doc count: ${docs.length}`);
});
