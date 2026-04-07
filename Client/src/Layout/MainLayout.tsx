import { Outlet } from "react-router-dom"
import { SidebarProvider} from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/App-sidebar"
import {AppSidebar2} from "@/components/App-sidebar2"


const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar2 />
      <main className="flex-1 min-h-screen pl-4 pt-3">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default MainLayout
