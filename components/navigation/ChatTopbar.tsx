"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MotionDiv } from "@/constants/motionProps";
import { toast } from "sonner";

import { ChatSidebar, Logo, PopupWrapper } from "@/components";

interface IGameStats {
  label: string;
  value: string | number;
}

const ChatTopbar = ({
  intro,
  about,
  stats,
  examplePrompts,
}: {
  intro?: string;
  about?: string;
  stats?: IGameStats[];
  examplePrompts?: string[];
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isGlobal, setIsGlobal] = useState(true);

  const pathname = usePathname(); // Instantiating the router

  useEffect(() => {
    setShowMenu(false); // Reset the menu when the route changes
  }, [pathname]);

  const toggleSwitch = () => {
    setIsGlobal(!isGlobal);
    toast.success(`Global chats ${isGlobal ? "disabled" : "enabled"}`, {
      duration: 1000,
    });
  };
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  return (
    <div>
      <div className="border-b border-white/5 pb-5 shadow-2xl shadow-light/5">
        <div className="flex-v-center justify-between gap-5 container bg-black/30 backdrop-blur-sm !pb-4">
          <div className="show-md">
            <Logo showName />
          </div>

          <button
            onClick={toggleSwitch}
            className={`flex-v-center !gap-2 rounded-[2rem] backdrop-blur-sm md:py-[6px] md:px-2 ${
              isGlobal ? "bg-brand-1/50 md:bg-brand-1/50" : "md:bg-white/5"
            }`}
          >
            <div className="switch" data-ison={isGlobal}>
              <MotionDiv
                className="handle flex-center"
                layout
                transition={spring}
              />
            </div>
            <p className="text-sm show-md">Global Chat</p>
            {/* <ChevronDown /> */}
          </button>
          <div className="hide-md flex-center !gap-[2px] flex-col">
            <p className="!text-white font-semibold">Price Pool: $100,000</p>
            <p className="opacity-90 xs">Game ends in 00:00</p>
          </div>
          <div className="hide-md">
            <Menu onClick={() => setShowMenu(true)} />
          </div>
        </div>
        <div className="container !py-0 flex gap-2">
          <div className="sidebar-card !bg-none !flex-row gap-2">
            <div className="min-w-fit hide-md">
              <Logo />
            </div>
            <p>{intro}</p>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="hide-md">
          <PopupWrapper close={() => setShowMenu(false)}>
            <ChatSidebar
              about={about}
              stats={stats}
              examplePrompts={examplePrompts}
            />
          </PopupWrapper>
        </div>
      )}
    </div>
  );
};

export default ChatTopbar;
