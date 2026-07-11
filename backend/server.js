import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";


import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend ka port
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRouter);

// ✅ IIFE start
(async () => {
  try {
    await connectDB();
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  } catch (error) {
    console.log("Server start failed:", error);
  }
})();