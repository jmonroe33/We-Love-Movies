const router = require("express").Router({ mergeParams: true })
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")
const theatersRouter = require("../theaters/theaters.router")
const reviewsRouter = require("../reviews/reviews.router")

// route for theaters
router.use("/:movieId/theaters", controller.validateMovieExists, theatersRouter)
router.use("/:movieId/reviews", controller.validateMovieExists, reviewsRouter)

router.route("/:movieId")
.get(controller.read)
.all(methodNotAllowed)
// just lists out all the movies
router.route("/")
.get(controller.list)
.all(methodNotAllowed)




module.exports = router
