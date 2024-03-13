// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: './env' 
})
 
connectDB()  
.then(()=>{
  app.listen(process.env.PORT || 4000 , ()=>{
    console.log(`server is running at ${process.env.PORT}`)
  })
})
.catch((error)=>{
  console.log(error+ 'mongo db connection error')
})






// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express"

// // this is using ifie ()()to call immidiatly 
// const app = express();
// ;(async()=>{
//   try {
//    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//    app.on("error",(error)=>{
//     console.log("error:",error);
//     throw error;
//    })

//    app.listen(process.env.PORT ,()=>{
//     console.log(`app is listing on port ${process.env.PORT}`)
//    })



//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// })()