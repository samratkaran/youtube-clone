import {asyncHandler} from "../utils/asyncHandler.js"

const registerUSer = asyncHandler(async (req ,res)=>{
  //get user details from frontend
  // validation 
  // check if user is already exsist
  // if not exists then create user
  // check for images , check for avtaar
  // upload them to cloudinary ,avtaar
  // create usr object  - create entry in db
  //remove password and refresh token field from response
  // check for user creation
  // return response 

    const {username , email , fullname, password} =   req.body
    console.log("email:", email)



})

export {registerUSer}