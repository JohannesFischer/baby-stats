const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const config = require('./config');
const csvr = require('./csv-reader');
const processData = require('./util/process-data');
const MongoDB = require('./db/mongodb');

MongoDB.connect();

const readdirAsync = promisify(fs.readdir);
const dirname = path.join(__dirname, 'csv');

async function importFiles() {
  try {
    const files = await readdirAsync(dirname);
    const csvFiles = files.filter(file => file.endsWith('.csv'));
    console.log('Importing files:', files.join(', '));
    let count = 0;

    csvFiles.forEach(file => {
      return csvr.read(path.join(dirname, file)).then(function(data) {
        const modelName = file.split('.')[0];

        if (!config.models.includes(modelName)) {
          console.log('Invalid model: %s', modelName);
          return {};
        }

        const model = require('./db/models/' + modelName);

        console.log('Importing %s...', file);

        // Truncate docs
        model.remove({}, function(err) {
          if (err) throw new Error(err);

          const tableData = processData[modelName](data);

          model.insertMany(tableData, function(err, docs) {
            if (err) throw new Error(err);
            count++;
            console.log(`Successfully imported ${docs.length} entries into ${model.modelName}`);

            if (count === csvFiles.length) {
              process.exit();
            }
          });
        })
      });
    });
  }
  catch (err) {
    console.log('ERROR:', err);
  }
}

importFiles();
