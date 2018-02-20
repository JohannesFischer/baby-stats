const moment = require('moment');

// Modify duration to be in minutes
function durationInMinutes(duration) {
  const match = duration.match(/((\d+)\shrs?)?\s?((\d+)\smin)?/);
  const durationString = `${match[2] || '0'}:${match[4] || '00'}`;
  return moment.duration(durationString).asMinutes();
}

// Modify date to a proper date object
function makeDateObject(time) {
  return moment(time, 'DD/MM/YYYY HH:mm').format();
}

module.exports = {
  durationInMinutes,
  makeDateObject
};
