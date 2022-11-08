const knex = require("../db/connection")

function list() {
    return knex("movies as m")
    .select("*")   
}
// list for showing movies
function listShowingMovies(boolean) {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .distinct()
    .where({ is_showing: boolean })
}

function read(movieId) {
    return knex("movies")
    .select("*")
    .where({movie_id: movieId }).first()
}


module.exports = {
    list,
    read,
    listShowingMovies,
    
}