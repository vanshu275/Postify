import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";


export const register = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  const normalizedUsername = username.toLowerCase().trim();

  const existingUser = await User.findOne({ username: normalizedUsername });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Username already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name.trim(),
    username: normalizedUsername,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { token },
  });
});


export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const user = await User.findOne({
    username: username.toLowerCase().trim(),
  }).select("+password"); // agar select:false schema me hai to ye zaroori

  // Same generic message for both cases — user enumeration se bachne ke liye
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = generateToken(user._id);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: { token },
  });
});


export const getMe = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User data fetched successfully",
    data: req.user,
  });
});