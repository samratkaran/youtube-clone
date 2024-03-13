import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiErrror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

// sometime we do not use res so in that we use _

export const verfiyJWT = asyncHandler(async (req, _, next) => {
  
try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "unauthorized request");
    }
  
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
  
    if (!user) {
      throw new ApiError(401, "Invalid acess Token");
      // need to disscuss
    }
    req.user = user;
    next();
} catch (error) {
  throw new ApiError(401 , error?.message || "invalid acess Token");
}
});
