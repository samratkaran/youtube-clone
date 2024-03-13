import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(`\n mongo DB Connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("mongo DB connection error ", error);
    process.exit(1);
  }
};
export default connectDB 

// clg connectionInstance and see the result in console
// THIS COMMENT IS ADDED

