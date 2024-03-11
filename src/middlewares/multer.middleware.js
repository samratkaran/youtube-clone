// import multer from "multer";

// const storage = multer.diskStorage({
//   destination:function(req,file,cb){
//     cb(null,"../../public/tempfile")
//   },
//   filename:function(req,file,cb){
   
//     cb(null , file.originalname )
//   }
// })

// export const upload = multer({
//   storage:storage
// })
// few chnages in folder


import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory
    const destinationPath = path.join(__dirname, ".../../public/tempfile");
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, file.originalname);
  }
});

export const upload = multer({
  storage: storage,
  // You can add additional configuration options here
});
