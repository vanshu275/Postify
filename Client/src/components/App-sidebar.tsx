import { Link } from "react-router-dom"
import { useState } from "react"
import {
  Home,
  MessageCircle,
  PlusSquare,
  RectangleGoggles,
  UserRound,
} from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
  { icon: PlusSquare, label: "Create", href: "/create" },
]

export const AppSidebar = () => {
  const [hovered, setHovered] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const token = localStorage.getItem("token")

  return (
    <div
      className="flex h-screen w-[14vw] flex-col justify-between px-3 py-4 transition-all duration-800 ease-in-out fixed left-0 top-0"
      onMouseLeave={() => {
        if (showMenu) {
          setShowMenu(false)
        }
      }}
    >
      {/* Top Section */}
      <div>
        <div className="mb-8 ml-1 flex justify-start text-2xl">
          <RectangleGoggles size={35} />
        </div>

        <div
          className="flex flex-col gap-6"
          onMouseLeave={() => setHovered(false)}
        >
          {navItems.map((item) => {
            return (
              <Link
                to={item.href}
                key={item.label}
                className={`} flex items-center gap-4 rounded-lg p-2 transition ${hovered ? "hover:bg-[#25282C]" : ""} hover:text-black`}
              >
                <item.icon
                  onMouseEnter={() => setHovered(true)}
                  size={24}
                  className={`text-white`}
                  strokeWidth={2}
                />

                {hovered && (
                  <span className={`text-[15px] text-white`}>{item.label}</span>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Bottom Profile */}
      {token && (
        <div className="relative">
          <div
            onClick={() => setShowMenu(!showMenu)}
            onMouseLeave={() => {
              setHovered(false)
            }}
            className={`flex cursor-pointer items-center gap-4 rounded-lg p-2 ${
              hovered ? "hover:bg-[#25282C]" : ""
            }`}
          >
            <UserRound
              onMouseEnter={() => setHovered(true)}
              size={hovered ? 22 : 24}
              className="text-white"
            />

            {hovered && <span className="text-[15px] text-white">Profile</span>}
          </div>

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute bottom-12 left-4 w-[70%] rounded-md bg-white text-black shadow-lg">
              <button
                onClick={() => {
                  localStorage.removeItem("token")
                  window.location.href = "/login"
                }}
                className="w-full rounded px-2 py-1 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
