const router = require("express").Router();
const controller = require("./generator.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/random-lib")
  .post(controller.generateRandomMadLib)
  .all(methodNotAllowed);

router.route("/madlib").post(controller.generateMadLib).all(methodNotAllowed);

router.route("/").all(methodNotAllowed);

//export router
module.exports = router;
