const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const userCreate = require("../controller/userController")
router.post("/user/login", userController)
router.post("/user/create", userCreate)
exports.User = router
