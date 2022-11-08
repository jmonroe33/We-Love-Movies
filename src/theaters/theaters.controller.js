const service = require("./theaters.service")

// validation middleware


// route handlers

async function list (req, res, next) {
    const data = await service.list()
    res.json({ data })
}
module.exports = {
    list,
}