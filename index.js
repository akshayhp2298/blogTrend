const env = require("dotenv")
const app = require("./routes")
const express = require("express")
const morgan = require("morgan")
env.config()
const port = process.env.PORT
const cors = require("cors")
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())
app.post("/ping",(req,res) => {
    console.log(req.body)
    res.send("success")
})
app.listen(port,(err) => {
    if(err) console.log(err)
    console.log(`server running on ${port}`)
})
