const mongoose = require('mongoose');

const nursingSchema = mongoose.Schema({
  date: Date,
  startSide: String,
  durationLeft: Number,
  durationRight: Number,
  durationTotal: Number
});

const Nursing = mongoose.model('Nursing', nursingSchema);

module.exports = Nursing;
