import { z } from "zod"

const createPostSchema = z.object({
  title: z.string()
    .min(3, "Title must be bigger than 2 characters"),
  content: z.string()
    .min(10, "Content must be bigger then 9 characters")
})

const commentSchema = z.object({
  content: z.string()
    .min(1, "Comment should not be empty")
})

export{
  createPostSchema,
  commentSchema
}