import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const toggleFollow = asyncHandler(async (req, res) => {
    const currentUserId = req.user._id;
    const { targetUserId } = req.params;

    if (currentUserId.toString() === targetUserId) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        });
    }

    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
        return res.status(404).json({
            message: "Target user not found"
        });
    }

    const currentUser = await User.findById(currentUserId).select("following");

    if (!currentUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const isFollowing = currentUser.following.some(
        id => id.toString() === targetUserId
    );

    if (isFollowing) {
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { following: targetUserId }
        });

        await User.findByIdAndUpdate(targetUserId, {
            $pull: { followers: currentUserId }
        });

        return res.status(200).json({
            message: "Unfollowed successfully"
        });
    }

    await User.findByIdAndUpdate(currentUserId, {
        $addToSet: { following: targetUserId }
    });

    await User.findByIdAndUpdate(targetUserId, {
        $addToSet: { followers: currentUserId }
    });

    return res.status(200).json({
        message: "Followed successfully"
    });
});


export const getFollowers = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId)
        .select("followers")
        .populate("followers", "name username profilePic");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        followers: user.followers
    });
});

export const getFollowing = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId)
        .select("following")
        .populate("following", "name username profilePic");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        following: user.following
    });
});