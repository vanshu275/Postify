import React from "react";
import { NavLink } from "react-router";
import { LogOut, House, Compass, Users, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  {
    title: "Home",
    path: "/",
    icon: House,
  },
  {
    title: "Explore",
    path: "/explore",
    icon: Compass,
  },
  {
    title: "Message",
    path: "/message",
    icon: Users,
  },
];

const SidebarContent = () => {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${isActive
      ? "bg-blue-600 text-white"
      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
    }`;

  return (
    <div className="flex w-full max-w-[280px] min-w-[220px] flex-col justify-between bg-zinc-950 p-4 sm:p-5 sticky top-0">
      {/* ================= TOP ================= */}

      <div>
        <h1 className="mb-6 sm:mb-10 text-2xl sm:text-3xl font-bold tracking-wide text-white">
          Postify
        </h1>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={navLinkClass}
              >
                <Icon size={22} className="shrink-0" />
                <span className="font-medium truncate">{item.title}</span>
              </NavLink>
            );
          })}

          <NavLink to="/me" className={navLinkClass}>
            <User size={22} className="shrink-0" />
            <span className="font-medium truncate">Profile</span>
          </NavLink>
        </nav>
      </div>

      {/* ================= BOTTOM ================= */}

      <div>
        <div className="mb-4 sm:mb-5 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 sm:p-3 mt-8 sm:mt-14">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-base sm:text-lg font-bold text-white">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="min-w-0 overflow-hidden">
            <p className="truncate font-semibold text-sm sm:text-base text-zinc-100">
              {user?.username || "Username"}
            </p>

            <p className="truncate text-xs sm:text-sm text-zinc-400">
              @{user?.username || "username"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center justify-center gap-2.5 sm:gap-3 rounded-xl border border-red-500 py-2.5 sm:py-3 text-sm sm:text-base text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <LogOut size={20} className="shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarContent;