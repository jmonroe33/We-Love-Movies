const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
// validation middleware
// need to make a movie exists
async function validateMovieExists(req, res, next) {
    const { movieId }  = req.params
    const foundMovie = await service.read(movieId)
    if (foundMovie) {
        res.locals.movie = foundMovie
        return next()
    }
    next({
        status: 404,
        message: "Movie cannot be found"
    })
}

// list method 
async function list (req, res, next) {
    const data = await moviesService.list()
    res.json({ data })
}

// read method
async function read(req, res, next) {
    res.json({ data: res.locals.movie })
}

module.exports = {
    list,
    read: [
        asyncErrorBoundary(validateMovieExists),
        asyncErrorBoundary(read)
    ],
}