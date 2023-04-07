const Lib = require("../db/models/LibModel");

function list() {
  return Lib.find().limit(20);
}

function listMostRecent() {
  return Lib.find().limit(20);
}

function like(_id) {
  return Lib.findOneAndUpdate({ _id }, {});
}

function dislike(_id) {}

module.exports = {
  list,
  like,
  dislike,
};
