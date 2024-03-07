import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import { Express } from "express";

const app = express();
;(async()=>{
  try {
   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
   app.on("error",(error)=>{
    console.log("error:",error);
    throw error;
   })

   app.listen()



  } catch (error) {
    console.log(error)
    throw error
  }
})()