import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { registerSchema, loginSchema } from "../validators/user.validator.js"

const registerUser = asyncHandler(async (req,res) => {
  // zod validator
  const result = registerSchema.safeParse(req.body)
  if (!result.success) {
    throw new ApiError(400, result.error.errors[0].message)
  }
  const {username, email, password} = req.body 

  if (!username, !email, !password){
    throw new ApiError(400, "All fields are required")
  } 

  const existed = await User.findOne({
    $or: [{email}, {username}]
  })
  if(existed) throw new ApiError (409, "User already existed")

  const user = await User.create({username, email, password})  
  
  return res.status(201).json(
    new ApiResponse(201, user, "User registered")
  )
})

const loginUser = asyncHandler(async (req, res) => {
  // zod validator
  const result = loginSchema.safeParse(req.body)
  if (!result.success) {
    throw new ApiError(400, result.error.errors[0].message)
  }
  const {email, password} = req.body

  const user = await User.findOne(email)
  if(!user) throw new ApiError (404, "User already existed")

  const isMatch = await User.isPasswordCorrect(password)
  if (!isMatch) throw new ApiError  (401, "Invalid Credential")  
  
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()
  
  user.refreshToken = refreshToken
  await user.save({validateBeforeSave: false})

  return res.status(200).json(
    new ApiResponse(200, { accessToken, refreshToken }, "Login success")
  )
})

const logoutUser = asyncHandler(async (req, res) => {
  req.user.refreshToken = null
  await req.user.save({ validateBeforeSave: false })

  return res.json(new ApiResponse(200, {}, "Logout success"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken

  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  const user = await User.findById(decoded._id)

  if(!user || user.refreshToken !== token){
    throw new ApiError (401, "Invalid Token")
  }

  const newAccessToken = user.generateAccessToken()

  return res.json(
    new ApiResponse(200, { accessToken: newAccessToken }, "Token refreshed")
  )
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const {oldPassword, newPassword} = req.body

  const user = await User.findById(req.user._id)

  const isMatch = await User.isPasswordCorrect(oldPassword)
  if(!isMatch) throw new ApiError(400, "Wrong Password")

  user.password = newPassword
  await user.save()  

  return res.json(new ApiResponse(200, {}, "Password changed"))
})

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword
}