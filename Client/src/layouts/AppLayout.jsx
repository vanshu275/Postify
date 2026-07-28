import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}