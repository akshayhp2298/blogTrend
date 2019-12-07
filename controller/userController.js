const { User } = require("../model/user")
const { validate } = require("../model/user")
const bcrypt = require("bcrypt")
const validateLogin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user)
    res.status(404).send({ isLoggedIn: false, message: "User not found" })
  const status = await user.isValidPassword(password)
  if (status) {
    const token = user.generateToken(user.id)
    res.status(200).send({ isLoggedIn: true, token })
  } else
    res
      .status(401)
      .send({ isLoggedIn: false, message: "email or password not valid" })
}
module.exports = validateLogin

const userCreate = async (req, res) => {
  const { error } = validate(req.body)
  if (error)
    res
      .status(400)
      .send({ isCreated: false, message: error.details[0].message })
  let user = await User.findOne({ email: req.body.email })
  if (user)
    res.status(400).send({ isCreated: false, message: "email already exists" })
  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    gender: req.body.gender || ""
  })
  user.password = await bcrypt.hash(user.password, 10)
  await user.save()
  const token = user.generateToken()
  res.status(200).send({ isCreated: true, token })
}
module.exports = userCreate
