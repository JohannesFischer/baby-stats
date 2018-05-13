module.exports = {
  baby: {
    birthDay: '2018-01-07',
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
