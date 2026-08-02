import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

import Sidebar from "../components/layout/Sidebar";
import RightPanel from "../components/layout/RightPanel";


export default function AppLayout() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto ml-7">
        <div className="mx-auto w-full max-w-3xl px-8 py-8">
          <Outlet />
        </div>
      </main>

      {/* Right Sidebar */}
      <RightPanel />

    </div>
  );
}