import "dotenv/config";

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { createServer } from "http";
import { initSocket } from "./src/socket/socket.js";

const PORT = process.env.PORT || 5000;
const server = createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    initSocket(server); // Initialize socket.io with the server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Rejection:", err);
      server.close(() => process.exit(1));
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received, shutting down gracefully");
      server.close(() => process.exit(0));
    });
  } catch (error) {
    console.error("Failed to start server");
    console.error(error);
    process.exit(1);
  }
};

startServer();