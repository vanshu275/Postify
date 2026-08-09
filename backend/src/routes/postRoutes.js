import express from "express";
import { createPost, likePost ,deletePost, getMyPosts, getPosts, getUserPosts } from "../controllers/postController.js";
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
router.get("/user/:username", getUserPosts);


// delete
router.delete("/:id", protect, deletePost);



// like
router.patch("/:postId/like", protect, likePost);

export default router;