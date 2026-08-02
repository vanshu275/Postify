import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profilePic: {
      type: String,
      default: "",
    },

    coverPic: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      trim: true,
      default: "",
      maxlength: 150,
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ]

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);