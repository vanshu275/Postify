import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";
import asyncHandler from "../utils/asyncHandler.js";


export const createPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const file = req.file;

  if (!content?.trim() && !file) {
    return res.status(400).json({
      success: false,
      message: "Post cannot be empty",
    });
  }

  let imageUrl = "";

  if (file) {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      imageUrl = result.secure_url;
    } finally {
      await fs.unlink(file.path).catch(() => { });
    }
  }

  const post = await Post.create({
    user: req.user._id,
    content: content?.trim() || "",
    image: imageUrl,
  });

  return res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
});


export const getPosts = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(20, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find()
      .populate("user", "username name profilePic")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments(),
  ]);

  return res.status(200).json({
    success: true,
    data: posts,
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + posts.length < total,
    },
  });
});


export const getMyPosts = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(20, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find({ user: req.user._id })
      .populate("user", "username name profilePic")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments({ user: req.user._id }),
  ]);

  return res.status(200).json({
    success: true,
    data: posts,
    pagination: {
      page,
      limit,
      total,
      hasMore: skip + posts.length < total,
    },
  });
});