const knex = require("../db/connection")

function list() {
    return knex("movies as m")
    .select("*")
    
}

function read(movieId) {
    return knex("movies")
    .select("*")
    .where({movie_id: movieId }).first()
}


module.exports = {
    list,
    read,
}