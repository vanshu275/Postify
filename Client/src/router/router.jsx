import { createBrowserRouter } from "react-router";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AppShell from "../components/layout/AppShell";
import Explore from "../pages/Explore";
import Friends from "../pages/Friends";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
 {
  element: <AppLayout />,
  children: [
    {
      element: <AppShell />,
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
          path: "/friends",
          element: <Friends />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
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