import express from "express"
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  toggleLike
} from "../controllers/post.controller.js"

import passport from "passport"

const router = express.Router()

router.post("/", passport.authenticate("jwt", { session: false }), createPost)
router.get("/", passport.authenticate("jwt", { session: false }), getPosts)
router.patch("/:id", passport.authenticate("jwt", { session: false }), updatePost)
router.delete("/:id", passport.authenticate("jwt", { session: false }), deletePost)
router.post("/like/:id", passport.authenticate("jwt", { session: false }), toggleLike)

export default router