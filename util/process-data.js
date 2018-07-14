const { durationInMinutes, makeDateObject } = require('./format');

function diaper(data) {
  return data.map(function(row) {
    const [ baby, time, status ] = row;
    const date = makeDateObject(time);

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
