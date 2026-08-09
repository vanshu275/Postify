import Post from "../models/Post.js";
import User from "../models/User.js";


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

  let imageURL = "";
  let imagePublicId = "";

  if (file) {
    try {
      const result = await cloudinary.uploader.upload(file.path);

      imageURL = result.secure_url;
      imagePublicId = result.public_id;
    } finally {
      await fs.unlink(file.path).catch(() => { });
    }
  }

  const post = await Post.create({
    user: req.user._id,
    content: content?.trim() || "",
    image: imageURL,
    imagePublicId,
  });

  await post.populate("user", "username name profilePic");

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


export const getUserPosts = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(20, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  const user = await User.findOne({
    username: req.params.username.toLowerCase().trim(),
  }).select("_id");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const [posts, total] = await Promise.all([
    Post.find({ user: user._id })
      .populate("user", "username name profilePic")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Post.countDocuments({ user: user._id }),
  ]);

  return res.status(200).json({
    success: true,
    data: posts,
    pagination: {
      hasMore: skip + posts.length < total,
    },
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  // Check if the user is the owner of the post
  if (post.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "You are not the owner of this post",
    });
  }

  if (post.imagePublicId) {
    await cloudinary.uploader.destroy(post.imagePublicId);
  }

  await Post.findByIdAndDelete(postId);

  return res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});



// like
export const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  const userId = req.user._id;

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyLiked) {
    // Unlike
    post.likes.pull(userId);
  } else {
    // Like
    post.likes.addToSet(userId);
  }

  await post.save();

  await post.populate("user", "username name profilePic");

  return res.status(200).json({
    success: true,
    message: alreadyLiked ? "Post unliked" : "Post liked",
    post,
    liked: !alreadyLiked,
  });
});