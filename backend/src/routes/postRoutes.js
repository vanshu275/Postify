import express from "express";
import Post from "../models/Post.js";
import {protect} from "../middleware/authMiddleware.js";
import { createPost , getAllPosts } from "../controllers/postController.js";

const router = express.Router();

// ✅ Create Post
router.post("/", protect, createPost); 

// ✅ Get all posts (feed)
router.get("/", getAllPosts);

export default router;