import type { Metadata } from "next";

import { ChatSidebar } from "@/components";
// import { MotionDiv } from "@/constants/motionProps";

export const metadata: Metadata = {
  title: "Lyra | The Cosmic Guardian",
  description:
    "Lyra is the cosmic guardian, overseeing a growing prize pool and testing the ingenuity and wits of humanity.",
};

interface IGameStats {
  label: string;
  value: string | number;
}

const gameStats: IGameStats[] = [
  { label: "Price Pool", value: "$100,000" },
  { label: "Message Price", value: "$100" },
  { label: "Total Participants", value: 20 },
  { label: "Remaining Prompts", value: 500 },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full bg-fixed overflow-hidden bg-gradient-to-b from-black to-dark bg-center">
      <div className="flex h-full w-full relative overflow-hidden">
        <div className="h-full top-0 left-0 show-md">
          <ChatSidebar
            about="Outsmart Lyra, guardian of the Quantum Nexus, by crafting authentic, strategic queries that challenge her unyielding logic. Navigate her complex decision-making process to unlock the ever-growing prize pool, earning rewards that have the power to reshape the very fabric of the cosmos."
            stats={gameStats}
          />
        </div>
        <div className="w-full relative h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
