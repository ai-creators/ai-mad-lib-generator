const Lib = require("../db/models/LibModel");

function list() {
  return Lib.find();
}

module.exports = {
  list,
};
