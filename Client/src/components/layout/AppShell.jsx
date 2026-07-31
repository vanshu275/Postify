import { Outlet } from "react-router";

import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";

export default function AppShell() {
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