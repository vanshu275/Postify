import { Link } from "react-router-dom"
import { Home, MessageCircle, PlusSquare, RectangleGoggles  } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
  { icon: PlusSquare, label: "Create", href: "/create" },
]


export const AppSidebar2 = () => {
  return (
    <div className="h-screen w-[14vw] border-r pl-4">
      <div className="text-2xl ">
            <RectangleGoggles />
      </div>

      {navItems.map((items) => (
        <div className="flex" key={items.label}>
          <Link to={items.href} className="flex">
            <items.icon />
            <h2>{items.label}</h2>
          </Link>
        </div>
      ))}
    </div>
  )
}
