import type { Metadata } from "next";

import { Sidebar, MobileTopbar } from "@/components";
// import { MotionDiv } from "@/constants/motionProps";

export const metadata: Metadata = {
	title: "ZETH | AI Tading Assistant",
  description:
    "ZetherBot is a decentralized AI trading assistant that executes optimized trades for holders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full bg-fixed overflow-hidden bg-gradient-to-b from-black/30 to-black">
      <div className="flex h-full w-full relative overflow-hidden">
        <div className="hide-lg w-full fixed top-0 left-0 z-[10000000000000]">
          <MobileTopbar />
        </div>
        <div className="h-full top-0 left-0 show-lg">
          <Sidebar />
        </div>
        <div className="w-full relative h-full overflow-auto pt-[80px] lg:pt-0 ">
          <div className="w-full container relative">{children}</div>
        </div>
      </div>
    </div>
  );
}
