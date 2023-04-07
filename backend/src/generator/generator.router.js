const router = require("express").Router();
const controller = require("./generator.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/RandomMadLib")
  .post(controller.randomMadLib)
  .all(methodNotAllowed);

router
  .route("/MadLib")
  .post(controller.madLib)
  .all(methodNotAllowed);

router.route("/").all(methodNotAllowed);

//export router
module.exports = router;
