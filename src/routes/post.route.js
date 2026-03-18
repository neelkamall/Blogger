import express from "express"
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  toggleLike
} from "../controllers/post.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/", authMiddleware, createPost)
router.get("/", getPosts)
router.patch("/:id", authMiddleware, updatePost)
router.delete("/:id", authMiddleware, deletePost)
router.post("/like/:id", authMiddleware, toggleLike)

export default router