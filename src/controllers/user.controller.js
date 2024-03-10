import {asyncHandler} from "../utils/asyncHandler.js"

const registerUSer = asyncHandler(async (req ,res)=>{
  res.status(200).json({
    message:"karan is now on portal"
  })
})

export {registerUSer}