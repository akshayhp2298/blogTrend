const passport = require("passport")
const jwt = require("passport-jwt").Strategy
const { ExtractJwt } = require("passport-jwt")
const User = require("../model/user")
require("dotenv").config
passport.use(
  new jwt(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: "secretKey"
    },
    async (payload, done) => {
      try {
        const user = User.findById(payload._id)
        if (!user) return done(null, false)
        done(null, user)
      } catch (err) {
        done(err, false)
      }
    }
  )
)
