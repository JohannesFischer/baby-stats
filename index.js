const csvr = require('./csv-reader');
const { durationInMinutes, makeDateObject } = require('./util/format');
const MongoDB = require('./db/mongodb');
const Sleep = require('./db/models/sleep');

const db = new MongoDB();
db.connect();

// csvr.read().then(data => {
//   const babyData = data.map(row => {
//     const [ baby, time, duration, note ] = row;
//     const date = makeDateObject(time);
//     const durationInMin = durationInMinutes(duration);

//     return {
//       date,
//       durationInMin
//     };
//   });

//   console.log(babyData);
// });

// Average Sleep Duration
// const reducerSum = (accumulator, currentValue) => accumulator + currentValue.durationInMin;
// const average = babyData.reduce(reducerSum, 0) / babyData.length;
// const averageDuration = moment.duration(average, 'minutes');
// console.log(`😴  Average sleep duration is ${averageDuration.hours()}:${averageDuration.minutes()} hours`)

// Sleep.insertMany(babyData);

console.log(Sleep.find().then((data) => console.log(data)));
