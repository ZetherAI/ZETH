"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Sidebar, Logo, PopupWrapper } from "@/components";

const MobileTopbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="flex-v-center justify-between gap-5 container bg-black/30 backdrop-blur-sm">
        <Logo showName />
        <Menu onClick={() => setShowMenu(true)} />
        {showMenu && (
          <div className="fixed top-0 left-0 w-full h-screen z-10">
            <PopupWrapper close={() => setShowMenu(false)} isFunction dark>
              <Sidebar />
            </PopupWrapper>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileTopbar;
