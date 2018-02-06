const mongoose = require('mongoose');

const sleepSchema = mongoose.Schema({
  date: Date,
  duration: Number
});

const Sleep = mongoose.model('Sleep', sleepSchema);

module.exports = Sleep;
