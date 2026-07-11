import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String, // image URL (Cloudinary ya local later)
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);