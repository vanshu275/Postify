import { Burger, Drawer } from "@mantine/core";
import { useState } from "react";
import SidebarContent from "./SidebarContent";
export default function Sidebar() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <div className="fixed left-3 top-8 z-50 md:hidden">
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          color="white"
        />
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          withCloseButton={true}
          size="60%"
          overlayProps={{
            blur: 8,
            opacity: 0.45,
          }}
          styles={{
            content: {
              background: "#09090b",
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      </div>
      <aside className="sticky top-0 hidden h-screen md:flex md:w-[25%] xl:w-64 flex-col border-r border-zinc-800 bg-zinc-950 p-6">
        <SidebarContent />
      </aside>
    </>
  );
}