// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { Home, MessageCircle, PlusSquare, UserRound } from "lucide-react"

// const navItems = [
//   { icon: Home, label: "Home", href: "/" },
//   { icon: MessageCircle, label: "Messages", href: "/messages", badge: 8 },
//   { icon: PlusSquare, label: "Create", href: "/create" },
// ]

// import { useState } from "react";
// import { Link } from "react-router-dom";

// export function AppSidebar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <Sidebar
//       collapsible="icon"
//       open={open}
//       onOpenChange={setOpen}
//       onMouseEnter={() => setOpen(true)}   // 👈 hover in
//       onMouseLeave={() => setOpen(false)}  // 👈 hover out
//     >
//       <SidebarHeader>
//         <div className="px-3 py-4">
//           <span className="text-2xl font-bold group-data-[collapsible=icon]:hidden">
//             POSTIFY
//           </span>
//         </div>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarMenu>
//             {navItems.map((item) => (
//               <SidebarMenuItem key={item.label}>
//                 <SidebarMenuButton
//                   className="text-[14.7px]"
//                   asChild
//                   tooltip={item.label}
//                 >
//                   <Link to={item.href}>
//                     <item.icon />
//                     <span>{item.label}</span>
//                     {item.badge && (
//                       <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
//                         {item.badge}
//                       </span>
//                     )}
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}

//             <SidebarMenuItem>
//               <SidebarMenuButton
//                 className="text-[14.7px]"
//                 asChild
//                 tooltip="Profile"
//               >
//                 <Link to="/profile">
//                   <UserRound />
//                   <span>Profile</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }