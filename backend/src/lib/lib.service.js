const Lib = require("../db/models/LibModel");

function list() {
  return Lib.find();
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
