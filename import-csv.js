const csvr = require('./csv-reader');
const { durationInMinutes, makeDateObject } = require('./util/format');
const MongoDB = require('./db/mongodb');

const db = new MongoDB();
db.connect();

const model = require('./db/models/sleep');
const file = 'csv/sleep.csv';

console.log('Removing documents from collection');
model.remove({}, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

console.log(`Importing data from ${file}...`);

csvr.read(file).then(data => {
  const tableData = data.map(row => {
    const [ baby, time, duration, note ] = row;
    const date = makeDateObject(time);
    const durationInMin = durationInMinutes(duration);

    return {
      date,
      durationInMin
    };
  });

  model.insertMany(tableData, (err, docs) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    console.log(`Successfully imported ${docs.length} entries into ${model.modelName}`);
    process.exit();
  });
});
