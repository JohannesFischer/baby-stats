const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function() {
//   console.log('Connected to MongoDB');
// });

const sleepSchema = mongoose.Schema({
  date: Date,
  durationInMin: Number
});

const Sleep = mongoose.model('Sleep', sleepSchema);

module.exports = Sleep;
