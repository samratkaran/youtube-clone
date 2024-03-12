import { Router } from "express";
import { registerUSer } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

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

export default router;