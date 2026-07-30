import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
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

export default router;