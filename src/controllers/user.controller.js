import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrror.js";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const genrateAcessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.genrateAcessToken();
    const refreshToken = user.genrateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false});

    return {accessToken , refreshToken}

    //this code also copy and paste with push cause today already had 9 commits


  } catch (error) {
    throw new ApiError(
      500,
      "somthing went wrong while generating refresh and access token"
    );
  }
};

const registerUSer = asyncHandler(async (req, res) => {
  //get user details from frontend
  // validation (25-30)
  // check if user is already exsist (38)
  // if not exists then create user
  // check for images , check for avtaar(41)
  // upload them to cloudinary ,avtaar(50)
  // create usr object  - create entry in db (58)
  //remove password and refresh token field from response (68)
  // check for user creation(72)
  // return response  (78)

  const { username, email, fullname, password } = req.body;
  // console.log("email:", email)
  // if (fullname==="") {
  //   throw new ApiError(400 , "full name is required")
  // }
  // this is common practice but in this we have to use multiple if else so we gonna use diffrent approch which is used in indrustrial usage

  // new approach

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  //this code will check the username and email it is new so ask to chatGPT

  if (existedUser) {
    throw new ApiError(409, "user alredy found ");
  }
  // this is old code and it has now changes by ChatGPT

  const avatarLocalPath =
    req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0
      ? req.files.avatar[0].path
      : undefined;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar path is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avtar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    //we used this cause cover image is not required
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "somthing went wrong while registring the uer");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user register successful"));
});
// login user

const loginUser = asyncHandler(async (req, res) => {
  // req body => data
  // username or email
  // find the user
  // password check
  // acess and refresh token
  // send token in form of coockes

  const { email, username, password } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "username or email  is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  // by this code we can find user by two method one is email and second is username

  if (!user) {
    throw new ApiError(404, "User not does not exist");
  }

  const isPasswordVaild = await user.isPasswordCorrect(password);

  if (!isPasswordVaild) {
    throw new ApiError(401, "password incorrect");
  }


const {refreshToken , accessToken}  = await genrateAcessAndRefreshTokens(user._id)

 const loggedInUser  = await User.findOne(user._id).select("-password , -refreshToken")

 const options ={
  httpOnly: true,
  sescure: true,
 }
 return res
 .status(200)
 .cookie("acessToken" ,accessToken , options)
 .cookie("refreshToken" ,refreshToken , options)
 .json(
  new ApiResponse(200 , {
    user:loggedInUser , accessToken , refreshToken
  }, "user logged in successfully")
 )
// ----------------------------


});

const logOutUser = asyncHandler(async (req , res)=>{
  await User.findByIdAndUpdate(req.user._id ,{
    $set:{refreshToken:undefined}

  },{
    new:true
  })

  const options ={
    httpOnly: true,
    sescure: true,
   }
   return res
   .status(200)
   .clearCookie("accessToken" ,options)
   .clearCookie("refreshToken" ,options)
   .json(new ApiResponse(200 ,{} ,"user logged Out"))

  //we have access of the user by middleware jwt that we used you can also check in route that middelware

})

// logout added and need to be push tomorrow


export { registerUSer, loginUser , logOutUser };
