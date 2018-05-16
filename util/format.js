const moment = require('moment');

function capitalize(str) {
  return `${str[0].toUpperCase()}${str.substr(1)}`;
}

// Modify duration to be in minutes
function durationInMinutes(duration) {
  const match = duration.match(/((\d+)\shrs?)?\s?((\d+)\smin)?/);
  const durationString = `${match[2] || '0'}:${match[4] || '00'}`;
  return moment.duration(durationString).asMinutes();
}

// Modify date to a proper date object
function makeDateObject(time) {
  return moment(time, 'MM/DD/YY HH:mm').format();
}

module.exports = {
  capitalize,
  durationInMinutes,
  makeDateObject
};
