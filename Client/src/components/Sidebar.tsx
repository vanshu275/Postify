import { Link, useLocation } from "react-router-dom"
import { Home, Search, PlusSquare, Heart, User, LogOut } from "lucide-react"

const navItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Search", icon: Search, path: "/search" },
  { name: "Create", icon: PlusSquare, path: "/create" },
  { name: "Notifications", icon: Heart, path: "/notifications" },
  { name: "Profile", icon: User, path: "/profile" },
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="flex h-screen w-64 flex-col justify-between border-r p-4">
      <div className="flex flex-col gap-10 justify-center">
        {/* Logo */}
        <h1 className="mb-3 mt-6 text-2xl font-bold">Postify 🚀</h1>

        {/* Nav Links */}
        <div className="flex flex-col gap-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg p-2 transition ${
                  isActive ? "bg-muted font-semibold" : "hover:bg-muted"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Logout */}
      <button className="flex items-center gap-2 rounded-lg p-2 hover:bg-muted">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  )
}

export default Sidebar
