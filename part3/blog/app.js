const config = require("./utils/config")
const express = require('express')
const app = express()
const cors = require('cors')
const {info,error} = require("./utils/logger")
const blogRouter = require("./controllers/blog")

//Database
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)


mongoose.connect(config.MONGODB_URI,()=>{
    info("DB connected ")
})

//Middleware
app.use(cors())
app.use(express.json())

//Route
app.use("/api/blogs",blogRouter)

module.exports = app