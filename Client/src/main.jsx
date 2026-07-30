import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import router from "./router/router";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <AuthProvider>
        <PostProvider>
          <RouterProvider router={router} />
        </PostProvider>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);