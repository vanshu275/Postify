import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();


// middlewares
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


// export
export default app;