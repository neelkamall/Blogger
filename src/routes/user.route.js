import express from "express"
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword
} from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", authMiddleware, logoutUser)
router.post("/refresh-token", refreshAccessToken)
router.post("/change-password", authMiddleware, changeCurrentPassword)

export default router