import type { Metadata } from "next";

import { Sidebar } from "@/components";
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
    <div className="flex bg-lyra-sm lg:bg-lyra-lg min-h-screen bg-fixed bg-center bg-cover">
      <div className="flex bg-gradient-to-b from-black/10 to-black min-h-screen w-full">
        <div className="h-full fixed top-0 left-0">
          <Sidebar />
        </div>
        <div className="w-full container">{children}</div>
      </div>
    </div>
  );
}
