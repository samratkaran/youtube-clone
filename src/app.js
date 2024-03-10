import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app  = express()
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended: true, limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())


// routes import

import userRouter from "./routes/user.routes.js"

// route declarations

app.use("/api/v1/users", userRouter)

// this is how routes work first will be https:localhost:3000/api/v1/users/register or any thing fisrt will be user so the all controll have user.routes.js file now 









export {app}



// by using this use multiple time we are configuring our backend like first we define cross origin by CORS then we set limit of json data that we get from server then we define the url path so this is called configuring our backend.