import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Bearer token extract
    const splitToken = token.split(" ")[1];

    const decoded = jwt.verify(splitToken, process.env.JWT_SECRET);

    req.user = decoded; // user data attach

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};