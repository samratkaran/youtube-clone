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


export {app}



// by using this use multiple time we are configuring our backend like first we define cross origin by CORS then we set limit of json data that we get from server then we define the url path so this is called configuring our backend.