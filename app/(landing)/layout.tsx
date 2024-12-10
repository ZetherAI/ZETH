import type { Metadata } from "next";

import { Sidebar, MobileTopbar } from "@/components";
// import { MotionDiv } from "@/constants/motionProps";

export const metadata: Metadata = {
  title: "Lyra | The Cosmic Guardian",
  description:
    "Lyra is the cosmic guardian, overseeing a growing prize pool and testing the ingenuity and wits of humanity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-fixed overflow-hidden bg-gradient-to-b from-black/30 to-black">
      <div className="flex h-screen w-full relative">
        <div className="hide-lg w-full fixed top-0 left-0 z-[10000000000000]">
          <MobileTopbar />
        </div>
        <div className="h-full top-0 left-0 show-lg">
          <Sidebar />
        </div>
        <div className="w-full relative h-screen overflow-auto pt-[80px] lg:pt-0 ">
          <div className="w-full container relative h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
