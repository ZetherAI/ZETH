import type { Metadata } from "next";

import { ChatSidebar } from "@/components";
// import { MotionDiv } from "@/constants/motionProps";

import { ExamplePrompts } from "@/constants/staticText";

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
    <div className="flex h-full bg-fixed overflow-hidden bg-gradient-to-b from-black to-dark bg-center">
      <div className="flex h-full w-full relative overflow-hidden">
        <div className="h-full top-0 left-0 show-md ">
          <ChatSidebar examplePrompts={ExamplePrompts} />
        </div>
        <div className="w-full relative h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
