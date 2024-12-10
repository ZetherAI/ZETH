"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Sidebar, Logo, PopupWrapper } from "@/components";

const MobileTopbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname(); // Instantiating the router

  useEffect(() => {
    setShowMenu(false); // Reset the menu when the route changes
  }, [pathname]);

  return (
    <>
      <div className="flex-v-center justify-between gap-5 container bg-black/30 backdrop-blur-sm">
        <Logo showName />
        <Menu onClick={() => setShowMenu(true)} />
      </div>
      {showMenu && (
        <PopupWrapper close={() => setShowMenu(false)}>
          <Sidebar />
        </PopupWrapper>
      )}
    </>
  );
};

export default MobileTopbar;
