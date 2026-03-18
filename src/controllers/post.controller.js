import { Post } from "../models/post.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body

  const post = await Post.create({
    title,
    content,
    owner: req.user._id
  })

  return res.status(201).json(
    new ApiResponse(201, post, "Post created")
  )
})

const getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit

  const posts = await Post.find()
    .skip(skip)
    .limit(limit)

  return res.json(new ApiResponse(200, posts, "Posts fetched"))
})

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) throw new ApiError(404, "Post not found")

  if (post.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed")
  }

  post.title = req.body.title || post.title
  post.content = req.body.content || post.content

  await post.save()

  return res.json(new ApiResponse(200, post, "Post updated"))
})

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) throw new ApiError(404, "Post not found")

  if (post.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed")
  }

  await post.deleteOne()

  return res.json(new ApiResponse(200, {}, "Post deleted"))
})

const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  const userId = req.user._id

  if (post.likes.includes(userId)) {
    post.likes.pull(userId)
  } else {
    post.likes.push(userId)
  }

  await post.save()

  return res.json(new ApiResponse(200, post, "Like toggled"))
})

export {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  toggleLike
}