import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // FIXED Likes (array)
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // NEW (Cloudinary)
    image: {
      type: String
    },
    image_public_id: {
      type: String
    }

  },
  { timestamps: true }
);





export const Post = mongoose.model("Post", postSchema)