function reduceCount(res) {
  return res.reduce((acc, doc) => acc + doc.count, 0);
}

module.exports = {
  reduceCount
};
