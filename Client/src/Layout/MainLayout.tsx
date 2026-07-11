import { Outlet } from "react-router-dom"
import { SidebarProvider} from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/App-sidebar"
import {AppSidebar} from "@/components/App-sidebar"


const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-h-screen pl-4 pt-3 ml-[11vw]">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default MainLayout
