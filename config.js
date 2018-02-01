module.exports = {
  mongo: {
    document: 'test',
    host: process.env.MONGO_HOST || 'localhost',
    port: 27017
  }
};
