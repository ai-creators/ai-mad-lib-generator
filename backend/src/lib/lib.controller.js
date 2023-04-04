const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./lib.service");

async function listLibs(req, res, next) {
  res.status(200).json({ data: await service.list() });
}

module.exports = {
  list: [],
  save: [],
};
