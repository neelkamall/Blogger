import express from "express"
import {
  addComment,
  replyComment,
  getCommentsByPost,
  deleteComment
} from "../controllers/comment.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"


const router = express.Router()

router.post("/:postId", authMiddleware, addComment)
router.post("/:postId/:commentId", authMiddleware, replyComment)
router.get("/:postId", getCommentsByPost)
router.delete("/:id", authMiddleware, deleteComment)

export default router