const { select, join } = require("../db/connection")
const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

// middle ware that alius the updated and created at to inject this object
// inside of the movie object while keeping the created at and the updated at.
// review exists  middleware function 

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created",
    updated_at: "critic.updated"
})

// knex query for the list of reviews for a specified movie
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

// finds a specified review and updates it based on the 
// review id matching the review id of the updated review.
function update(updatedReview) {
    return knex("reviews as r")
        .select("*")
        .where({ "r.review_id": updatedReview.review_id })
        .update(updatedReview, "r.*")
        .then(updatedRecords => updatedRecords[0])

}
// finds a specific critic 
function findCritic(reviewId) {
    return knex("critics as c")
        .join("reviews as r", "r.critic_id", "c.critic_id")
        .select("c.*")
        .distinct()
        .where({ review_id: reviewId })
        .first()
}
// finding a specified review
function read(reviewId) {
    return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first()
}

function destroy(review_id) {
    return knex("reviews")
    .where({ review_id })
    .del();
}




module.exports = {
    list,
    read,
    update,
    findCritic,
    destroy,
}
