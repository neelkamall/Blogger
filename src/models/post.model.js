import mongoose from "mongoose";

const userSchema = new Schema(
  {
    title: {
      type: String,
      required : true
    },
    content: {
      type : String,
      required : true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref : "User",
      required: true
    },
    Likes : {
      type: Schema.Types.ObjectId,
      ref : "User",
      default : []
    }
  }
)



export const Post = mongoose.model("Post", postSchema)