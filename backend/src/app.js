import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"

import { notFound } from "./middleware/notFoundMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";

import multer from "multer"

const app = express();

// middlewares in-built for some khatarnak work
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile" , profileRoutes)
app.use("/api/messages", messageRoutes);

// middleware for notFound
app.use(notFound);
app.use(errorHandler);

// export
export default app;