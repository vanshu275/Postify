import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "../models/message.js";
import socketAuth from "./socketAuth.js";

const onlineUsers = new Map();

export const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ["GET", "POST"],
        },
    });

    io.use(socketAuth);

    io.on("connection", (socket) => {
        const userId = socket.user.id;
        onlineUsers.set(userId, socket.id);

        // Discoonect event
        socket.on("disconnect", () => {
            onlineUsers.delete(userId);
        });



        socket.on("sendMessage", async ({ receiver, message }) => {
            try {
                const sender = socket.user.id;

                const newMessage = await Message.create({
                    sender,
                    receiver,
                    message,
                });

                // Sender ko bhi message bhejo
                socket.emit("receiveMessage", newMessage);

                // Receiver ko message bhejo
                const receiverSocketId = onlineUsers.get(receiver);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receiveMessage", newMessage);
                }

            } catch (error) {
                console.error("Socket message error:", error);
            }
        });




    });

};
