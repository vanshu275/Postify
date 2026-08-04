import { createBrowserRouter } from "react-router";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import AppShell from "../components/layout/AppShell";
import Explore from "../pages/Explore";
import Message from "../pages/Message";
import Me from "../pages/Me";
import User from "../pages/User";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "/me",
        element: <Me />,
      },
      {
        path : "/profile/:username",
        element : <User />
      }
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;