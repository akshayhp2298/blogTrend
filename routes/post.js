const express = require("express")
const router = express.Router()
const passport = require("passport")
const passportConf = require("../auth/passport")
router.get("/post", passport.authenticate('jwt',{session:false}), (req,res) => {
    res.send("post")
})

exports.Post =  router;