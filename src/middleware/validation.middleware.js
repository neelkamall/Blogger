export const validateRegister = (req, res, next) => {
  const { email, password, fullName } = req.body

  if (!email || !password || !fullName) {
    return res.status(400).json({ message: "All fields required" })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password too short" })
  }

  next()
}