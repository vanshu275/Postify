import Message from "../models/message.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getMessages = asyncHandler(async (req , res)=>{
    const userId = req.user.id;
    const receverId = req.params.receiverId;
    if(!receverId){
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

export const sendMessage = asyncHandler(async (req , res)=>{
    const sender = req.user.id;
    const { receiver , message}  = req.body;
    if(!sender || !receiver || !message){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    const newMessage = await Message.create(
        {
            sender,
            receiver,
            message
        }
    )
    return res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: newMessage
    })
})