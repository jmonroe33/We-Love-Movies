if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")

//allow express to accept json payloads
app.use(express.json())

// Route routes
app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)

// Error handlers


module.exports = app;
