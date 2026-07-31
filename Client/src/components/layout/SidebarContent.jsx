import React from 'react'
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
        title: "Friends",
        path: "/friends",
        icon: Users,
    },
    {
        title: "Profile",
        path: "/profile",
        icon: User,
    },
];

const SidebarContent = () => {
    const { user, logout } = useAuth();
    return (
        <div>

            {/* ================= TOP ================= */}

            <div>

                <h1 className="mb-10 text-3xl font-bold tracking-wide">
                    Postify
                </h1>

                <nav className="space-y-2">

                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.title}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                                    }`
                                }
                            >
                                <Icon size={22} />

                                <span className="font-medium">
                                    {item.title}
                                </span>
                            </NavLink>
                        );
                    })}

                </nav>

            </div>

            {/* ================= BOTTOM ================= */}

            <div>

                <div className="mb-5 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold">

                        {user?.username?.charAt(0).toUpperCase() || "U"}

                    </div>

                    <div className="overflow-hidden">

                        <p className="truncate font-semibold">

                            {/* Backend Username */}
                            {user?.username || "Username"}

                        </p>

                        <p className="truncate text-sm text-zinc-400">

                            {/* Later email or bio */}

                            @{user?.username || "username"}

                        </p>

                    </div>

                </div>

                <button
                    onClick={() => {
                        // Logout Logic
                        logout();
                    }}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-red-500 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                    <LogOut size={20} />

                    Logout
                </button>

            </div>


        </div>
    )
}

export default SidebarContent
