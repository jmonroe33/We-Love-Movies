const service = require("./reviews.service")

async function list (req, res, next) {
    const { movieId } = req.params
    const data = await service.list(movieId)
    res.json({ data })
}


module.exports = {
   list,
}