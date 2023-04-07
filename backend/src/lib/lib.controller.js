const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./lib.service");

function checkQueryParams(req, res, next) {
  const { search = "" } = req.query;
  if (search) {
    res.locals.search = search;
  }
  return next();
}

async function listLibs(req, res, next) {
  try {
    const { search = "" } = res.locals;
    if (search) {
      const data = await service.search(search);
      res.status(200).json({ data });
    } else {
      const data = await service.list();
      res.status(200).json({ data });
    }
  } catch (err) {
    return next({ status: 500, message: "Unable to gather ad-libs" });
  }
}

async function likeLib(req, res, next) {
  try {
    const { _id = null } = req.body.data;
    if (!_id) {
      return next({ status: 400, message: "Unable to like ad-lib" });
    }
    const updatedLib = await service.like();
  } catch (error) {}
}

async function dislikeLib(req, res, next) {
  try {
    const { _id = null } = req.body.data;
    if (!_id) {
      return next({ status: 400, message: "Unable to like ad-lib" });
    }
    const updatedLib = await service.dislike();
  } catch (error) {}
}

module.exports = {
  list: [asyncErrorBoundary(listLibs)],
  like: [asyncErrorBoundary(likeLib)],
  dislike: [asyncErrorBoundary(dislikeLib)],
  create: [],
  save: [],
};
