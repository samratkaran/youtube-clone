import { Router } from "express";
import { logOutUser, loginUser, refreshAccessToken, registerUSer } from "../controllers/user.controller.js";
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
  router.route("/refreshtoken").post(refreshAccessToken)
  
  // in this route we can see that how middleware is work we use verifyjwt as a middle warre just befrore using loogout and in verifyjwt we passed next() that will go to logoutuser after completeing its task if we want to use multiple middelware so we just use next() at them in the bottom ex:- royter.route("/logout").post(verfityjwt , verifyuser , logoutUser)

export default router;