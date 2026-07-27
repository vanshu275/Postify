import React from "react";
import ReactDOM from "react-dom/client";

import router from "./routes/router";
import { RouterProvider } from "react-router";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);