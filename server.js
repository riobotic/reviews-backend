// DEPENDENCIES
// get .env variables
require("dotenv").config()
// pull PORT from .env, give default value of 3001
// pull DATABASE_URL from .env
const { PORT = 3001, DATABASE_URL } = process.env
// import express
const express = require("express")
// create application object
const app = express()
// import mongoose
const mongoose = require("mongoose")
// import middlware
const cors = require("cors")
const morgan = require("morgan")

// DATABASE CONNECTION
// Establish Connection
mongoose.connect(DATABASE_URL)
// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error))

// MODELS
const ReviewsSchema = new mongoose.Schema({
  name: String,
  rating: String,
  description: String,
})

const Reviews = mongoose.model("Review", ReviewsSchema)

///////////////////////////////
// Middleware
////////////////////////////////
app.use(cors()) // to prevent cors errors, open access to all origins
app.use(morgan("dev")) // logging
app.use(express.json()) // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world")
})

// INDEX ROUTE
app.get("/reviews", async (req, res) => {
  try {
    // send all reviews
    res.json(await Reviews.find({}))
  } catch (error) {
    //send error
    res.status(400).json(error)
  }
})

// CREATE ROUTE
app.post("/reviews", async (req, res) => {
  try {
    // send all reviews
    res.json(await Reviews.create(req.body))
  } catch (error) {
    //send error
    res.status(400).json(error)
  }
})

// DELETE ROUTE
app.delete("/reviews/:id", async (req, res) => {
  try {
    // send all reviews
    res.json(await Reviews.findByIdAndDelete(req.params.id))
  } catch (error) {
    //send error
    res.status(400).json(error)
  }
})

// UPDATE ROUTE
app.put("/reviews/:id", async (req, res) => {
  try {
    // send all reviews
    res.json(
      await Reviews.findByIdAndUpdate(req.params.id, req.body, { new: true })
    )
  } catch (error) {
    //send error
    res.status(400).json(error)
  }
})

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))