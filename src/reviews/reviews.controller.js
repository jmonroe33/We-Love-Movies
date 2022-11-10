const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// validation middleware

//checking to see if a specific review exists 
async function reviewExists(req, res, next) {
    const { reviewId } = req.params
    const foundReview = await service.read(reviewId)
    if(foundReview) {
        res.locals.reviewId = reviewId
        res.locals.review = foundReview
        return next()
    } else {
        next({
            status:404,
            message: "Review cannot be found."
        })
    }
}

// routeHandlers 

// lists out all of the reviews for a specified movie
async function list (req, res, next) {
    const { movieId } = req.params
    const data = await service.list(movieId)
    res.json({ data })
}

// handles any requests to update a specific review
async function update(req, res, next) {
    const critic = await service.findCritic(res.locals.reviewId)
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        updated_at: Date.now().toString()
    }
    await service.update(updatedReview)
    updatedReview["critic"]= critic
    res.status(201).json({ data: updatedReview })  
}

async function destroy(req, res, next) {
    await service.destroy(res.locals.reviewId)
    res.sendStatus(204)
}


module.exports = {
    list: asyncErrorBoundary(list), 
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update),
    ],
    destroy:[
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy)
    ]
}