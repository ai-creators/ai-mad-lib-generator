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

function search(text) {
  return Lib.find({
    $or: [
      { prompt: { $regex: text, $options: "i" } },
      { text: { $regex: text, $options: "i" } },
    ],
  });
}

module.exports = {
  list,
  like,
  dislike,
  search,
};
