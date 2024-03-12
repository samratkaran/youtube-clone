import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    {
      // upload the file on cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      // file has been uploaded successfully
      // this is we added for to unlink the file once it is uploaded on cloudinary
      fs.unlinkSync(localFilePath)
      console.log("file uploaded on cloudinary", response.url);
      return response;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    // remove the locally saved temprory file as the upload opration got failed
  }
};

export {uploadOnCloudinary}