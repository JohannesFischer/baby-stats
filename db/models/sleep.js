const mongoose = require('mongoose');

const sleepSchema = mongoose.Schema({
  date: Date,
  durationInMin: Number
});

const Sleep = mongoose.model('Sleep', sleepSchema);

module.exports = Sleep;
