import { Router } from "express";
import {
   changeCurrentPassword,
    getCurrentUser,
     getUserChannelProfile,
      getWatchHistory,
       logOutUser,
        loginUser, 
        refreshAccessToken,
         registerUSer,
          updateAccountDetails,
           updateUserAvatar,
            updateUserCoverImage } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name:"avatar",
      maxCount:1
    },
    {
      name:"coverImage",
      maxCount:1
    }
    //here we used multer for upload file and avtaar just before registerUSer cause it is a middleware
  ]),
  registerUSer)

  router.route("/login").post(loginUser)


  // secured routers

  router.route("/logout").post(verfiyJWT, logOutUser)
  // router.route("/refreshtoken").post(refreshAccessToken)
  router.route("/change-password").post(verfiyJWT , changeCurrentPassword)
  router.route("/current-user").get(verfiyJWT , getCurrentUser)
  router.route("/update-accout").patch(verfiyJWT  ,updateAccountDetails)
  // router.route("/update-avatar").patch(verfiyJWT , upload.single("avatar") , updateUserAvatar)
  // router.route("/update-cover-image").patch(verfiyJWT , upload.single("coverImage") , updateUserCoverImage)

  // router.route("/c/:username").get(verfiyJWT , getUserChannelProfile)
  router.route("/history").get(verfiyJWT , getWatchHistory)
   

  
  // in this route we can see that how middleware is work we use verifyjwt as a middle warre just befrore using loogout and in verifyjwt we passed next() that will go to logoutuser after completeing its task if we want to use multiple middelware so we just use next() at them in the bottom ex:- royter.route("/logout").post(verfityjwt , verifyuser , logoutUser)

export default router;