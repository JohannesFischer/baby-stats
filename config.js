module.exports = {
  // Read these from folder on init?
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
