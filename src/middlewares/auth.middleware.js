import { User } from "../models/User.model";
import { ApiError } from "../utils/ApiErrror";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "json-web-token";

export const verfiyJWT = asyncHandler(async (req, res, next) => {
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
