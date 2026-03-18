import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Token lena
    const token = req.header("Authorization")?.replace("Bearer ", "")

    // 2. Token nahi hai
    if (!token) {
      return res.status(401).json({ message: "Unauthorized request" })
    }

    // 3. Token verify
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    // 4. User find
    const user = await User.findById(decoded._id).select("-password")

    // 5. User nahi mila
    if (!user) {
      return res.status(401).json({ message: "Invalid token" })
    }

    // 6. req.user set
    req.user = user

    next()

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    })
  }
}

export { authMiddleware }