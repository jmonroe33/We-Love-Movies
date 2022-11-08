const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created",
    updated_at: "critic.updated"
})

function list (movieId) {
    return knex("reviews as r")
    .join("critics as c" , "r.critic_id", "c.critic_id" )
    .select(
        "r.*", 
        "c.critic_id",
        "c.preferred_name",
        "c.surname",
        "c.organization_name",
        "c.created_at as created",
        "c.updated_at as updated"
    )
    .where({"r.movie_id": movieId})
    .then(data => data.map(addCritic))
}






module.exports = {
    list,
}
