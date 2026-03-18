import { Comment } from "../models/comment.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

const addComment = asyncHandler(async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    post: req.params.postId,
    owner: req.user._id
  })

  return res.json(new ApiResponse(201, comment, "Comment added"))
})

const replyComment = asyncHandler(async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    post: req.params.postId,
    owner: req.user._id,
    parentComment: req.params.commentId
  })

  return res.json(new ApiResponse(201, comment, "Reply added"))
})

const getCommentsByPost = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })

  return res.json(new ApiResponse(200, comments, "Comments fetched"))
})

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)

  if (!comment) throw new ApiError(404, "Comment not found")

  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed")
  }

  await comment.deleteOne()

  return res.json(new ApiResponse(200, {}, "Comment deleted"))
})

export {
  addComment,
  replyComment,
  getCommentsByPost,
  deleteComment
}