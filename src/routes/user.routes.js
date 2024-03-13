import { Router } from "express";
import { logOutUser, loginUser, registerUSer } from "../controllers/user.controller.js";
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

export default router;