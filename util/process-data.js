const { durationInMinutes, makeDateObject } = require('./format');

function diaper(data) {
  return data.map(function(row) {
    const [ baby, time, status ] = row;
    const date = makeDateObject(time);

    if (date === 'Invalid date') return {};

    return {
      date,
      status: status.toLowerCase()
    };
  });
}

function nursing(data) {
  return data.map(function(row) {
    const [ baby, time, startSide, durationLeft, durationRight ] = row;
    const date = makeDateObject(time);
    const durationLeftInMin = durationInMinutes(durationLeft);
    const durationRightInMin = durationInMinutes(durationRight);

    if (date === 'Invalid date') return {};

    return {
      date,
      startSide: startSide.toLowerCase(),
      durationLeft: durationLeftInMin,
      durationRight: durationRightInMin
    };
  });
}

function sleep(data) {
  return data.map(function(row) {
    const [ baby, time, duration ] = row;
    const date = makeDateObject(time);
    const durationInMin = durationInMinutes(duration);

    if (date === 'Invalid date') return {};

    return {
      date,
      duration: durationInMin
    };
  });
}

module.exports = {
  diaper,
  nursing,
  sleep
};
