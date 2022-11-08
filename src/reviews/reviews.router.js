const router = require("express").Router()
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")


router.route("/")
.get(controller.list)

module.exports = router