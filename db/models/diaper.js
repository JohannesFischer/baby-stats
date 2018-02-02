const mongoose = require('mongoose');

const diaperSchema = mongoose.Schema({
  date: Date,
  status: String
});

const Diaper = mongoose.model('Diaper', diaperSchema);

module.exports = Diaper;
