import { Post } from "../models/post.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { Comment } from "../models/comment.model.js"
import { createPostSchema } from "../validators/post.validator.js"

const createPost = asyncHandler(async (req, res) => {
  // zod validator
  const result = createPostSchema.safeParse(req.body)
  if (!result.success) {
    throw new ApiError(400, result.error.errors[0].message)
  }

  const {title, content} = req.body

  const post = await Post.create({
    title,
    content,
    owner : req.body._id
  })

  return res.status(201).json(
    new ApiResponse(201, post, "Post created")
  )
})

const getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1)*10
  const search = req.query.search || ""

  const posts = await Post.find({
    title: { $regex: search, $options: "i" }
  })

  const post = await post.find()
  .populate("owner", "username email") //populate include
  .skip(skip)
  .limit(limit)
  

  return res.json(new ApiResponse(200, posts, "Posts fetched"))
})

const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findbyId(req.params._id)
  if(!post) throw new ApiError (404, "Post not found")

  if (post.owner._id.toString() !== req.owner._id.toString()){
    throw new ApiError(403, "Not allowed")
  } 
  
  post.title = req.post.title || post.tilte
  post.content = req.post.content || req.content

  await post.save()


  return res.json(new ApiResponse(200, post, "Post updated"))
})

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findbyId(req.params._id)
  if(!post) throw new ApiError(403, "Post not found")

  if(post.owner._id.toString() !== req.owner._id.toString()){
    throw new ApiError(403, "Not Allowed")
  }

  await Comment.deleteMany({ post: post._id})
  await post.deleteOne()

  return res.json(new ApiResponse(200, {}, "Post deleted"))
})

const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findbyId(req.params._id)

  const userId = req.user._id

  if(post.likes.includes(userId)){
    post.likes.pull(userId)
  }else{
    post.likes.post(userId)
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