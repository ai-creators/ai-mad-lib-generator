const router = require("express").Router();
const controller = require("./lib.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/list").get(controller.list).all(methodNotAllowed);

module.exports = router;
