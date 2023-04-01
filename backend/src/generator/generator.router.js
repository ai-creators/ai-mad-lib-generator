const router = require("express").Router();
const controller = require("./generator.controller");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/generate")
  .post(asyncErrorBoundary(controller.madLibGenerator))
  .all(methodNotAllowed);

router.all("*", (req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = router;
