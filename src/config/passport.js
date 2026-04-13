import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { User } from "../models/user.model.js"

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET
}

passport.use(
  new JwtStrategy(options, async (decoded, done) => {
    try {
      const user = await User.findById(decoded._id).select("-password")
      if (!user) return done(null, false)
      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  })
)

export default passport