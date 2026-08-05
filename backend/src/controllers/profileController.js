import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";


export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        username: req.params.username.toLowerCase().trim(),
    }).populate("followers", "username name profilePic")
        .populate("following", "username name profilePic");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return res.status(200).json({
        success: true,
        data: user,
    });
});


export const updateProfile = asyncHandler(async (req, res) => {
    const { name, bio } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (bio !== undefined) updates.bio = bio.trim();

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true,
    });

    return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
    });
});


export const searchUsers = asyncHandler(async (req, res) => {
    const { query } = req.query;

    if (!query?.trim()) {
        return res.status(200).json({
            success: true,
            data: [],
        });
    }

    const safeQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const users = await User.find({
        username: { $regex: `^${safeQuery}`, $options: "i" },
    })
        .select("name username profilePic")
        .limit(10);

    return res.status(200).json({
        success: true,
        data: users,
    });
});