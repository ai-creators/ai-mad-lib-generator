const Lib = require("../db/models/LibModel");

function create(lib) {
  return Lib.create(lib);
}

module.exports = {
  create,
};
