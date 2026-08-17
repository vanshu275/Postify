import express from "express";
import {toggleFollow , getFollowers , getFollowing} from "../controllers/followController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/followers/:userId", getFollowers);
router.get("/following/:userId", getFollowing);
router.post("/:targetUserId", protect, toggleFollow);

export default router;