import Message from "../models/message.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js"

export const getMessages = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const receverId = req.params.receiverId;
    if (!receverId) {
        return res.status(400).json({
            success: false,
            message: "Receiver id is required"
        })
    }

    const messages = await Message.find({
        $or: [
            { sender: userId, receiver: receverId },
            { sender: receverId, receiver: userId }
        ]
    }).sort({ createdAt: 1 });

    return res.status(200).json({
        success: true,
        message: "Messages fetched successfully",
        data: messages
    })
})


// Get all users who have sent or received messages from the logged-in user
export const getConversationUsers = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const messages = await Message.find({
        $or: [
            { sender: userId },
            { receiver: userId }
        ]
    }).sort({ createdAt: -1 });

    const userIds = new Set();

    messages.forEach((message) => {
        if (message.sender.toString() === userId.toString()) {
            userIds.add(message.receiver.toString());
        } else {
            userIds.add(message.sender.toString());
        }
    });

    const users = await User.find({
        _id: { $in: [...userIds] }
    }).select("username name profilePic");

    return res.status(200).json({
        success: true,
        data: users
    });
});