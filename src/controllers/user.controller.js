import {asyncHandler} from "../utils/asyncHandler"

const registerUSer = asyncHandler(async (req ,res)=>{
  res.status(200).json({
    message:"ok"
  })
})

export {registerUSer}