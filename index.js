import express from "express"
import dotenv from "dotenv"
import { Connectdb } from "./db.js"
import cors from "cors"
import signuprouter from "./routers/signup.js"
import loginrouter from "./routers/signin.js"
import resetrouter from "./routers/forget.js"
import userrouter from "./routers/user.js"
import taskrouter from "./routers/task.js"
import updatedetails from "./routers/update.js"

dotenv.config()
const app =express()
const PORT=process.env.PORT
app.use(express.json())
app.use(cors())
Connectdb()
app.use("/signup",signuprouter)
app.use("/signin",loginrouter)
app.use("/reset",resetrouter)
app.use("/user",userrouter)
app.use("/update",updatedetails)
app.use("/task",taskrouter)
app.listen(PORT,()=>{console.log("server is running")})