// index.js - Backend entry point

import dotenv from "dotenv"
import connectDB from "./db/db.js"
import { app } from "./app.js"

// 1️ Load environment variables from .env file
dotenv.config({
  path: './.env'
})

// 2️ Connect to MongoDB
connectDB()
  .then(() => {
    // 3️ Start the server after DB connection is successful
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`)
    })
  })
  .catch((err) => {
    // 4️ Handle DB connection failure
    console.log("MONGO DB connection failed !!!", err)
  })





















/*
import express from "express"
const app = express()

( async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error", ()=> {
      console.log ("ERRR:",error)
      throw error
    })

app.listen(process.env.PORT, ()=>{
  console.log(`App is listening on port ${process.env.PORT}`);
})

  } catch (error) {
    console.log("ERROR:", error)
    throw err
  }
})()*/