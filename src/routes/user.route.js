import express from "express"
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword
} from "../controllers/user.controller.js"
import passport from "passport"
import multer from "multer"                  // NEW

const router = express.Router()

const upload = multer({ dest: "public/temp" }) // NEW

router.post("/register", upload.single("avatar"), registerUser) // UPDATED

router.post("/login", loginUser)
router.post("/logout", passport.authenticate("jwt", { session: false }), logoutUser)
router.post("/refresh-token", refreshAccessToken)
router.post("/change-password", passport.authenticate("jwt", { session: false }), changeCurrentPassword)

export default router