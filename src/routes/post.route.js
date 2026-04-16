import express from "express"
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  toggleLike
} from "../controllers/post.controller.js"

import passport from "passport"
import multer from "multer"                 // NEW

const router = express.Router()

const upload = multer({ dest: "public/temp" }) // NEW

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),                   // NEW
  createPost
)

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getPosts
)

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),                   // NEW
  updatePost
)

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
)

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  toggleLike
)

export default router