import { Comment } from "../models/comment.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { commentSchema } from "../validators/post.validator.js"

const addComment = asyncHandler(async (req, res) => {
  // zod validator
  const result = commentSchema.safeParse(req.body)
  if (!result.success) {
    throw new ApiError(400, result.error.errors[0].message)
  }
  const comment = await Comment.create({
    content : req.body.content,
    post : req.params._id,
    owner : req.user._id
  })

  return res.json(new ApiResponse(201, comment, "Comment added"))
})

const replyComment = asyncHandler(async (req, res) => {
  // zod validator
  const result = commentSchema.safeParse(req.body)
  if (!result.success) {
    throw new ApiError(400, result.error.errors[0].message)
  }
  const comment = await Comment.create({
    content : req.body.content,
    post : req.params._id,
    owner : req.user._id,
    parentComment : req.params.commentId
  })
  return res.json(new ApiResponse(201, comment, "Reply added"))
})

const getCommentsByPost = asyncHandler(async (req, res) => {
  const comment = await Comment.find({ post : req.params.postId})
    .populate("owner", "username email") // populate include

  return res.json(new ApiResponse(200, comments, "Comments fetched"))
})

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  if(!comment) throw new ApiError (404, "Comment not found")

  if(comment.owner.toString() !== req.user._id.toString()){
    throw new ApiError (403, "Not Allowed")
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