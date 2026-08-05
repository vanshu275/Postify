import express from "express";
import { createPost, getMyPosts, getPosts } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();


router.post(
  "/",
  protect,
  upload.single("image"),
  createPost
);
router.get("/", getPosts);
router.get("/myPost", protect , getMyPosts);

export default router;