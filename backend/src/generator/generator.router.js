const router = require("express").Router();
const controller = require("./generator.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/generateRandomMadLib")
  .post(controller.generateRandomMadLib)
  .all(methodNotAllowed);

router
  .route("/generateMadLib")
  .post(controller.madLibGenerator)
  .all(methodNotAllowed);

router.route("/").all(methodNotAllowed);

//export router
module.exports = router;
