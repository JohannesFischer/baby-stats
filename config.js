module.exports = {
  baby: {
    birthDay: '2018-01-01',
  },
  csv: {
    dateformat: 'DD/MM/YY HH:mm'
  },
  models: [
    'diaper',
    'nursing',
    'sleep'
  ],
  mongo: {
    document: 'test',
    host: process.env.MONGO_HOST || 'localhost',
    port: 27017
  }
};
