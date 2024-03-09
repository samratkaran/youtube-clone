import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //cloudnary URL
      required: true,
    },
    thumbnail: {
      type: String, //cloudnary URL
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);
