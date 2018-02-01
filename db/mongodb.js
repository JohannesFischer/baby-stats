const mongoose = require('mongoose');
const config = require('../config');

const { document, host, port } = config.mongo;

module.exports = class MongoDB {
  connect() {
    mongoose.connect(`mongodb://${host}:${port}/${document}`);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    // db.once('open', function() {
    //   console.log('Connected to MongoDB');
    // });
  }
};
