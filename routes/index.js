const express = require("express")
require("dotenv").config()
const app = express()
app.use(express.json())
const cors = require("cors")
const morgan = require("morgan")
const { User } = require("./user")
const { Post } = require("./post")
const routes = [User, Post]
const mongoose = require("mongoose")
app.use(cors())
app.use(morgan("tiny"))
const uri = process.env.URI

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err))

routes.forEach(route => {
  app.use("/api", route)
})

module.exports = app
