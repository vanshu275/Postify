import Post from "../models/Post.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { text, image } = req.body;

    // Validate
    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Post text is required",
      });
    }

    const post = await Post.create({
      user: req.user._id,
      text,
      image,
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
      .populate("user", "username")
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