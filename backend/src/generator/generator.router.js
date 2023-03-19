const router = require("express").Router();
const controller = require("./generator.controller");
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/madlib').all(methodNotAllowed);
router.route('/').all(methodNotAllowed); 

//export router
module.exports = router;