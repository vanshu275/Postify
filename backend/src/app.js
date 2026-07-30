import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

import { notFound } from "./middleware/notFoundMiddleware.js";

import multer from "multer"

const app = express();

// middlewares in built for some khatarnak work
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

// middleware for notFound
app.use(notFound);

// export
export default app;