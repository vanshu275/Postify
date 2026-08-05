import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile, searchUsers, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.patch("/", protect, updateProfile);
router.get("/search", searchUsers); 
router.get("/:username", getProfile);

export default router;