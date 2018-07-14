const mongoose = require('mongoose');

const diaperSchema = mongoose.Schema({
  date: Date,
  status: String
});

const Diaper = mongoose.model('Diaper', diaperSchema);

Diaper.groupByStatus = function(callback) {
  Diaper.aggregate()
    .sort({ status: 'desc' })
    .group({
      _id: '$status',
      count: { $sum: 1 }
    })
    .exec(function(err, res) {
      if (err) return handleError(err);

      callback(res);
    });
}

module.exports = Diaper;
