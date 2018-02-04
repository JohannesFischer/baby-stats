const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const csvr = require('./csv-reader');
const { durationInMinutes, makeDateObject } = require('./util/format');
const MongoDB = require('./db/mongodb');

MongoDB.connect();

const readdirAsync = promisify(fs.readdir);
const dirname = path.join(__dirname, 'csv');

function processData(data, model) {
  if (model === 'diaper') {
    return data.map(function(row) {
      const [ baby, time, status ] = row;
      const date = makeDateObject(time);

      return {
        date,
        status
      };
    });
  }

  if  (model === 'nursing') {
    return data.map(function(row) {
      const [ baby, time, startSide, durationLeft, durationRight ] = row;
      const date = makeDateObject(time);
      const durationLeftInMin = durationInMinutes(durationLeft);
      const durationRightInMin = durationInMinutes(durationRight);

      return {
        date,
        startSide: startSide.toLowerCase(),
        durationLeftInMin,
        durationRightInMin
      };
    });
  }

  if (model === 'sleep') {
    return data.map(function(row) {
      const [ baby, time, duration ] = row;
      const date = makeDateObject(time);
      const durationInMin = durationInMinutes(duration);

      return {
        date,
        durationInMin
      };
    });
  }

  return false;
}

async function importFiles() {
  try {
    const files = await readdirAsync(dirname);
    const csvFiles = files.filter(file => file.endsWith('.csv'));
    console.log('Importing: ', files.join(', '));

    const promises = files.map(file => {
      return csvr.read(path.join(dirname, file)).then(function(data) {
        // TODO: validate name
        const modelName = file.split('.')[0];
        const model = require('./db/models/' + modelName);

        console.log(`Importing ${file}...`);

        // Truncate docs
        model.remove({}, function(err) {
          if (err) throw new Error(err);
        });

        return {
          data: processData(data, modelName),
          model
        };
      });
    });

    Promise.all(promises).then(function(values) {
      values.forEach(function(item) {
        const { data, model } = item;
        model.insertMany(data, function(err, docs) {
          if (err) throw new Error(err);

          console.log(`Successfully imported ${docs.length} entries into ${model.modelName}`);
        });
      });
      console.log(`Imported ${files.length} files as promised.`);
      // process.exit();
    });
  }
  catch (err) {
    console.log('ERROR:', err);
  }
}

importFiles();
