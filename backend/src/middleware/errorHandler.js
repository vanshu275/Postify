export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose duplicate key (username already exists)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Username already exists",
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    return res.status(400).json({ success: false, message });
  }

  // Invalid JWT
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};