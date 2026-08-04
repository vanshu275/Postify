import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const file = req.file;

    // Validate
    if (!content?.trim() && !file) {
      return res.status(400).json({
        success: false,
        message: "Post cannot be empty",
      });
    }

    let imageUrl = "";

    if (file) {
      const result = await cloudinary.uploader.upload(file.path);

      imageUrl = result.secure_url;

      await fs.unlink(file.path);
    }

    const post = await Post.create({
      user: req.user._id,
      content,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user" , "username" )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const myPosts = await Post.find({ user: req.user._id })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: myPosts,
    });
  } catch (error) {
    console.error("Error in getMyPosts:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};