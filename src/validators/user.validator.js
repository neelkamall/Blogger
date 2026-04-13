import { z } from "zod"

const registerSchema = z.object({
  username: z.string()
    .min(3, "Username must be bigger than 2 characters")
    .max(20, "Username must be smaller than 21 characters"),
    
  email: z.string()
    .email("Put valid email"),
    
  password: z.string()
    .min(6, "Password must be bigger than 5 characters")
})

const loginSchema = z.object({
  email: z.string()
    .email("Put valid email"),
    
  password: z.string()
    .min(6, "Password must be bigger than 5 characters")
})

export{
  registerSchema,
  loginSchema
}