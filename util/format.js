const moment = require('moment');
const config = require('../config');

// TODO: test us

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
  return moment(time, config.csv.dateformat).format();
}

function pluralize(str, count) {
  return count > 1
    ? `${str}s`
    : str;
}

// return duration as readable string
function humanizeDuration(duration) {
  const months = duration.months();
  const weeks = duration.weeks();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const str = [];

  if (weeks > 0) {
    const weekTitle = pluralize('week', weeks);
    str.push(`${weeks} ${weekTitle}`);
  }

  if (days > 0) {
    const dayTitle = pluralize('day', days);
    str.push(`${days} ${dayTitle}`);
  }

  if (hours > 0 && (weeks < 1 && days < 2)) {
    const hourTitle = pluralize('hour', hours);
    str.push(`${hours} ${hourTitle}`);
  }

  if (minutes > 0 && (weeks < 1 && days < 1)) {
    const minuteTitle = pluralize('minute', minutes);
    str.push(`${minutes} ${minuteTitle}`);
  }

  if (seconds > 0 && (weeks < 1 && hours < 1)) {
    const secondTitle = pluralize('second', seconds);
    str.push(`${seconds} ${secondTitle}`);
  }

  return str.join(' ');
}

module.exports = {
  capitalize,
  durationInMinutes,
  humanizeDuration,
  makeDateObject
};
