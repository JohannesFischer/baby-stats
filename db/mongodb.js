const mongoose = require('mongoose');
const config = require('../config');

const { document, host, port } = config.mongo;

module.exports = {
  connect() {
    mongoose.connect(`mongodb://${host}:${port}/${document}`);
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));

    // db.once('open', function() {
    //   console.log('Connected to MongoDB');
    // });
  },
  close() {
    this.db.close();
  }
};
