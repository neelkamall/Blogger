import express from "express"
import {
  addComment,
  replyComment,
  getCommentsByPost,
  deleteComment
} from "../controllers/comment.controller.js"
import passport from "passport"

const router = express.Router()

router.post("/:postId", passport.authenticate("jwt", { session: false }), addComment)
router.post("/:postId/:commentId", passport.authenticate("jwt", { session: false }), replyComment)
router.get("/:postId", passport.authenticate("jwt", { session: false }), getCommentsByPost)
router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteComment)

export default router