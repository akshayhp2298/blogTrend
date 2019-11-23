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
var fs = require('fs');
app.get("/",(re1,res)=>{
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
})
app.get("/ping",(req,res) => {
    res.send("success")
})
app.listen(port,(err) => {
    if(err) console.log(err)
    console.log(`server running on ${port}`)
})
