import express from "express";
import Post from "../models/Post.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Post
router.post("/", protect, async (req, res) => {
  try {
    const { text, image } = req.body;

    const post = new Post({
      user: req.user.id,
      text,
      image,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// ✅ Get all posts (feed)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

export default router;